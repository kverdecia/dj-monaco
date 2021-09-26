===============================
django widget for monaco editor
===============================

.. image:: https://badge.fury.io/py/dj-monaco.svg
    :target: https://badge.fury.io/py/dj-monaco

.. image:: https://travis-ci.org/kverdecia/dj-monaco.svg?branch=master
    :target: https://travis-ci.org/kverdecia/dj-monaco

.. image:: https://codecov.io/gh/kverdecia/dj-monaco/branch/master/graph/badge.svg
    :target: https://codecov.io/gh/kverdecia/dj-monaco

django widget for monaco editor

Documentation
-------------

The full documentation is at https://dj-monaco.readthedocs.io.

Quickstart
----------

Install django widget for monaco editor:

.. code-block::

    pip install dj-monaco

Add it to your `INSTALLED_APPS`:

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

Features
--------

* TODO

Running Tests
-------------

Does the code actually work?

.. code-block::

    source <YOURVIRTUALENV>/bin/activate
    (myenv) $ pip install tox
    (myenv) $ tox


Development commands
---------------------

.. code-block::

    pip install -r requirements_dev.txt
    invoke -l


Credits
-------

Tools used in rendering this package:

*  Cookiecutter_
*  `cookiecutter-djangopackage`_

.. _Cookiecutter: https://github.com/audreyr/cookiecutter
.. _`cookiecutter-djangopackage`: https://github.com/pydanny/cookiecutter-djangopackage
