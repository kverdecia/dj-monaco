from django import forms

from . import widgets
# from . import models


class MonacoForm(forms.Form):
    source_code = forms.CharField(widget=widgets.MonacoEditorWidget(attrs={"data-language": "typescript"}))


# class SourceCodeForm(forms.ModelForm):
#     class Meta:
#         model = models.SourceCode
#         fields = ('name', 'source_code', 'source_code2')
#         widgets = {
#             "source_code": widgets.MonacoEditorWidget(
#                 attrs={"data-language": "html"}
#             ),
#             "source_code2": widgets.MonacoEditorWidget(
#                 attrs={"data-language": "javascript"}
#             ),
#         }

#     class Media:
#         js = [
#             'https://unpkg.com/prueba/prueba.js'
#         ]

#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         self.fields['source_code'].label = 'asdkjfakds'
