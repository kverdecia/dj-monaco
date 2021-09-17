from django import forms


class MonacoEditorWidget(forms.Textarea):
    def get_context(self, name, value, attrs):
        context = super().get_context(name, value, attrs)
        attrs = {
            'monaco-editor': 'true',
            'data-language': 'html',
            'data-wordwrap': 'off',
            'data-minimap': 'false'
        }
        attrs.update(context['widget']['attrs'])
        context['widget']['attrs'] = attrs
        return context

    class Media:
        js = (
            'https://unpkg.com/monaco-editor@0.27.0/min/vs/loader.js',
            'https://unpkg.com/emmet-monaco-es/dist/emmet-monaco.min.js',
            'djmonaco/monaco-editor.js',
        )
        css = {
            'screen': ('djmonaco/monaco-editor.css', )
        }
