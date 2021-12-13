'use strict';
document.addEventListener('DOMContentLoaded', function () {
    require.config({
        paths: {
            'vs': 'https://unpkg.com/monaco-editor@0.27.0/min/vs',
        },
    });

    function containerNotInitialized(container) {
        const editorWrapperId = `${container.id}--editor`;
        return document.getElementById(editorWrapperId) === null;
    }

    function getInlineContainersWithTemplates() {
        // if in django admin returns an array with the containers in inline sections.
        // Otherwise returns an empty array.
        if (!window.django || !window.django.jQuery) {
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

    function setupEditor(container) {
        const form = container.form;
        const editorWrapper = document.createElement('div');
        editorWrapper.id = container.id + '--editor';
        editorWrapper.classList.add('monaco-editor--conteiner');

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

                var editor = monaco.editor.create(document.getElementById(container.id + '--editor'), {
                    renderWhitespace: true,
                    language: container.dataset.language,
                    wordWrap: container.dataset.wordwrap || 'off',
                    minimap: {
                        enabled: container.dataset.minimap === 'true'
                    },
                    fontSize: 12 + 1,
                    value: container.value
                });

                if (container.dataset.language === 'html') {
                    emmetMonaco.emmetHTML(monaco);
                }
                else if (container.dataset.language === 'css') {
                    emmetMonaco.emmetCSS(monaco);
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
    }

    getContainers().forEach(setupEditor);
    getInlineContainers().forEach(setupEditor);

    // this step is for django admin
    if (window.django && window.django.jQuery) {
        document.addEventListener('click', function() {
            getInlineContainers().forEach(setupEditor);
        });
    }
});
