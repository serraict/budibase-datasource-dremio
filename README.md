# Budibase-datasource-dremio

A [Dremio] datasource for [Budibase]

Leverage the information from your semantic data layer in [Dremio]
to build internal tools in minutes.

Quickly plug the holes in your application landscape NOW
and get back to work.

## Features

Retrieve up to 500 rows from any table view in your [Dremio] data lakehouse.

## Installation

The plugin is distributed through [its github repository].
To install the latest release, follow the _Add plugin_ instructions [here](https://docs.budibase.com/docs/custom-plugin),
choose a _Github_ source and use the url `https://github.com/serraict/budibase-datasource-dremio`.
You do not need to specify a token.

## Development

Setup your [Budibase development environment].
Clone this repo into your plugin directory.
Then, to rebuild the plugin while developing:

```bash
yarn watch
```

To run the tests, setup your Dremio instance,
publish its web interface on <http://localhost:9047>,
and create a user with name `bb` and password `budibase1`.
Add the Dremio Samples data source and create the views needed for the tests.

Then to run tests:

```bash
npx jest --detectOpenHandles --watchAll
```

## Release

Every push of the main branch to Github will result in a release. So to release:

1. Bump the version in [`package.json`](package.json).
1. Push to Github.

You can find the releases
[here on Github](https://github.com/serraict/budibase-datasource-dremio/releases/).

## Backlog

* Page through results for result sets exceeding 500 rows, try to align this with however BB does this.
  In Dremio, we can use [offset- and limit parameters].
  And the job has information about the number of records.
* Get query string escaping right (e.g. quoted identifiers in [Dremio]).
* v1.0.0 release here!

## Out of scope (for now)

* _Create, Update, and Delete queries._ We treat the Dremio data lakehouse as a read-only datasource.

## Instructions

Work in progress, see [my public learning log here](https://serra.fibery.io/Public/Learnings-by-State-80#Learning/Connect-Dremio-to-budibase-207).

---

[Dremio]: https://github.com/dremio/dremio-oss
[Budibase]: https://github.com/Budibase/budibase
[offset- and limit parameters]: https://docs.dremio.com/24.3.x/reference/api/#limit-and-offset-query-parameters
[Budibase development environment]: https://docs.budibase.com/docs/custom-plugin
[github repository]: https://github.com/serraict/budibase-datasource-dremio