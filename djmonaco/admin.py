# -*- coding: utf-8 -*-
# from django import forms
# from django.contrib import admin
from django.forms import Media

# from . import models
# from . import forms


class MonacoAdminMixin:
    """Use this mixin with a ModelAdmin subclass that is using the
    widget `djwidgetdefinitions.widgets.MonacoEditorWidget`.
    """
    def render_change_form(self, request, context, add, change, form_url, obj = None):
        monaco_js = [
            'https://unpkg.com/monaco-editor@0.27.0/min/vs/loader.js',
            'https://unpkg.com/emmet-monaco-es/dist/emmet-monaco.min.js',
            'widget-definitions/monaco-editor.js',
        ]
        js_assets = list(context['media']._js)
        js_assets = [asset for asset in js_assets if asset not in monaco_js]
        js_assets.extend(monaco_js)
        media = Media(css=context['media']._css, js=js_assets)
        context['media'] = media
        return super().render_change_form(request, context, add=add, change=change, form_url=form_url, obj=obj)


# @admin.register(models.SourceCode)
# class SourceCodeAdmin(admin.ModelAdmin):
#     list_display = ('name',)
#     form = forms.SourceCodeForm
