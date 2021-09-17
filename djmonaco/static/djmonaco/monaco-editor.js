document.addEventListener('DOMContentLoaded', function () {
    require.config({
        paths: {
            'vs': 'https://unpkg.com/monaco-editor@0.27.0/min/vs',
        },
    });

    var containers = Array.from(
        document.querySelectorAll('textarea[monaco-editor="true"]'));

    containers.forEach(function (container) {

        var form = container.form;

        var editorWrapper = document.createElement('div');
        editorWrapper.id = container.id + '--editor';
        editorWrapper.classList.add('monaco-editor--conteiner');

        require(['vs/editor/editor.main'], function () {
            try {
                container.style.display = 'none';
                container.parentElement.appendChild(editorWrapper);


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
    })
});
