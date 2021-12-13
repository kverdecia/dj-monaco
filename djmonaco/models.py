# -*- coding: utf-8 -*-
# from django.utils.translation import gettext_lazy as _
from django.db import models


# class SourceCode(models.Model):
#     name = models.CharField(_("Name"), max_length=100)
#     source_code = models.TextField(_("Source code"))
#     source_code2 = models.TextField(_("Source code2"))

#     class Meta:
#         verbose_name = _("Source code")
#         verbose_name_plural = _("Source codes")

#     def __str__(self):
#         return self.name


# class SourceItem(models.Model):
#     source_code = models.ForeignKey(SourceCode, verbose_name=_('Source code'),
#         on_delete=models.CASCADE, related_name='source_code_items')
#     source1 = models.TextField(_("Source 1"))
#     source2 = models.TextField(_("Source 2"))

#     class Meta:
#         verbose_name = _("Source item")
#         verbose_name_plural = _("Source items")
