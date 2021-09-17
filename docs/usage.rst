=====
Usage
=====

To use django widget for monaco editor in a project, add it to your `INSTALLED_APPS`:

.. code-block:: python

    INSTALLED_APPS = (
        ...
        'djmonaco.apps.DjMonacoConfig',
        ...
    )

Add django widget for monaco editor's URL patterns:

.. code-block:: python

    from djmonaco import urls as djmonaco_urls


    urlpatterns = [
        ...
        url(r'^', include(djmonaco_urls)),
        ...
    ]
