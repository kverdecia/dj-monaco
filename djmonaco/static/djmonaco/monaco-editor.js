'use strict';

(function(){
    document.addEventListener('DOMContentLoaded', function () {
        require.config({
            paths: {
                'vs': 'https://unpkg.com/monaco-editor@0.40.0/min/vs',
            },
        });
        require(['vs/editor/editor.main'], function () {
            const event = new CustomEvent('monaco:library-loaded');
            document.dispatchEvent(event);
        });
    });



})()


document.addEventListener('DOMContentLoaded', function () {
    const isInDjango = !!window.django && !!window.django.jQuery;
    require.config({
        paths: {
            'vs': 'https://unpkg.com/monaco-editor@0.40.0/min/vs',
        },
    });

    function containerNotInitialized(container) {
        const editorWrapperId = `${container.id}--editor`;
        return document.getElementById(editorWrapperId) === null;
    }

    function getInlineContainersWithTemplates() {
        // if in django admin returns an array with the containers in inline sections.
        // Otherwise returns an empty array.
        if (!isInDjango) {
            return []
        }
        const selector = '.inline-group textarea[monaco-editor="true"]';
        return Array.from(document.querySelectorAll(selector))
            .filter(containerNotInitialized)
    }

    function getInlineContainers() {
        return getInlineContainersWithTemplates()
            .filter(container => container.id.indexOf('-__prefix__-') === -1);
    }

    function getContainers() {
        const selector = 'textarea[monaco-editor="true"]';
        const inlineContainers = getInlineContainersWithTemplates();
        return Array.from(document.querySelectorAll(selector))
            .filter(containerNotInitialized)
            .filter(container => inlineContainers.indexOf(container) === -1)
    }

    function getInlineFieldName(text) {
        const regex = /-(\d+)-/;
        const match = text.match(regex);
        if (!match) {
            return null;
        }
        const startPosition = match.index + match[0].length;
        const secondSubstring = text.slice(startPosition);
        return secondSubstring;
    }

    function setupEditor(container) {
        const form = container.form;
        const editorWrapper = document.createElement('div');
        editorWrapper.id = container.id + '--editor';
        editorWrapper.classList.add('monaco-editor--container');

        require(['vs/editor/editor.main'], function () {
            try {
                container.style.display = 'none';
                container.parentElement.insertBefore(editorWrapper, container);
                monaco.editor.defineTheme('myTheme', {
                    base: 'vs',
                    inherit: true,
                    rules: [{ background: 'FFFFFF' }],
                    colors: {
                        'editor.lineHighlightBackground': '#00A1FF0F'
                    }
                });
                monaco.editor.setTheme('vs-dark');

                const diagnosticsOptions = {};

                if (container.dataset['enableSchemaRequest'] === 'true') {
                    diagnosticsOptions.validate = true;
                    diagnosticsOptions.allowComments = false;
                    diagnosticsOptions.schemas = [],
                    diagnosticsOptions.enableSchemaRequest = true;
                }

                if (Object.keys(diagnosticsOptions).length > 1) {
                    monaco.languages.json.jsonDefaults.setDiagnosticsOptions(diagnosticsOptions);
                }

                const editor = monaco.editor.create(document.getElementById(container.id + '--editor'), {
                    renderWhitespace: true,
                    readOnly: container.dataset.readonly === 'true',
                    language: container.dataset.language,
                    wordWrap: container.dataset.wordwrap || 'off',
                    minimap: {
                        enabled: container.dataset.minimap === 'true'
                    },
                    fontSize: 12 + 1,
                    value: container.value
                });
                editor.onDidChangeModelContent(() => {
                    container.value = editor.getValue();
                    container.dispatchEvent(new Event('change'));
                });
                const event = new CustomEvent('monaco:editor-created', {
                    detail: {
                        editor,
                        container,
                    },
                });
                document.dispatchEvent(event);

                if (container.dataset.language === 'html') {
                    emmetMonaco.emmetHTML(monaco);
                }
                else if (container.dataset.language === 'css') {
                    emmetMonaco.emmetCSS(monaco);
                }

                if (container.dataset.autoformat === 'true') {
                    setTimeout(() => {
                        editor.getAction('editor.action.formatDocument').run();
                    }, 100);
                }

                window[container.id + '_monaco_editor'] = editor;

                window.addEventListener('resize', function () {
                    editor.layout();
                });

                form.addEventListener('submit', function (e) {
                    container.value = editor.getValue();
                });
            } catch (err) {
                container.style.display = 'block';
                editorWrapper.remove();
            }
        });

        if (isInDjango) {
            const className = container.id.replace('id_', 'field-');
            const field = document.querySelector(`.form-row.${className}`);
            if (field !== null) {
                field.style.overflow = 'visible';
                return;
            }

            const fieldName = getInlineFieldName(container.id);
            if (fieldName === null) {
                return;
            }
            for (const element of document.querySelectorAll(`.form-row.field-${fieldName}`)) {
                if (element.querySelector(`#${container.id}`) !== null) {
                    element.style.overflow = 'visible';
                }
            }
        }
    }

    getContainers().forEach(setupEditor);
    getInlineContainers().forEach(setupEditor);

    // this step is for django admin
    if (isInDjango) {
        document.addEventListener('click', function() {
            getInlineContainers().forEach(setupEditor);
        });
    }
});
