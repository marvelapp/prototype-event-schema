import setuptools

# with open("README.md", "r") as fh:
#     long_description = fh.read()

setuptools.setup(
    name="marvel-proto-events",
    version="3.0.6",
    author="Marvel Prototyping",
    author_email="joe.alcorn@marvelapp.com",
    description="Proto events",
    url="https://github.com/marvelapp/prototype-event-schema",
    packages=setuptools.find_packages(),
    package_data={
        '': [
            'triggers/*.json',
            'objects/*.json',
            'outcomes/*.json',
            'event.json',
        ]
    },
    classifiers=[
        "Private :: No Upload",
    ],
)
