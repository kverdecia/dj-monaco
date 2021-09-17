from django import forms
from django.views.generic import FormView

from . import forms


class MonacoView(FormView):
    form_class = forms.MonacoForm
    template_name = 'djmonaco/monaco.html'
