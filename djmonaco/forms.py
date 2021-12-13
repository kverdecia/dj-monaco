from django import forms

from . import widgets
from . import models


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


# class SourceItemForm(forms.ModelForm):
#     class Meta:
#         model = models.SourceItem
#         fields = ('source1', 'source2')
#         widgets = {
#             "source1": widgets.MonacoEditorWidget(
#                 attrs={"data-language": "html"}
#             ),
#             "source2": widgets.MonacoEditorWidget(
#                 attrs={"data-language": "javascript"}
#             ),
#         }
