# Budibase-datasource-dremio

A [Dremio] datasource for [Budibase]

Leverage the information from your semantic data layer in [Dremio]
to build internal tools in minutes.

Quickly plug the holes in your application landscape NOW
and get back to work.

## Features

Retrieve up to 500 rows from any table view in your [Dremio] data lakehouse.

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

* Write installation instruction, and test that it works.
  Installation notes in readme. Small demonstration video / gif showing that it works.
  Basically: just add the Github url as described [here](https://docs.budibase.com/docs/custom-plugin).
* Ask for a code review. Any feedback is welcome.
  * [x] How to do logging in Budibase plugins? How to read them conveniently?
    I just use console.log and the read it in the test output.
  * [x] How to write and run tests.
  * [x] What are the coding guidelines for writing Budibase plugins with Typescript.
    I could not find linter configuration or sth similar. ESLint seems to be used for Budibase.
  * [x] How to include vanilla js node modules in a Typescript app? Is my `rollup.config.js` configured correctly?
    Seems to work now.
  * [ ] How to do versioning of releases? Or not at all?
  * How to setup github action that automatically tests and deploy?
* Page through results for result sets exceeding 500 rows, try to align this with however BB does this.
  In Dremio, we can use [offset- and limit parameters].
  And the job has information about the number of records.
* Get query string escaping right (e.g. quoted identifiers in [Dremio]).
* First release here!

## Out of scope (for now)

* _Create, Update, and Delete queries._ We treat the Dremio data lakehouse as a read-only datasource.

## Instructions

Work in progress, see [my public learning log here](https://serra.fibery.io/Public/Learnings-by-State-80#Learning/Connect-Dremio-to-budibase-207).

---

[Dremio]: https://github.com/dremio/dremio-oss
[Budibase]: https://github.com/Budibase/budibase
[offset- and limit parameters]: https://docs.dremio.com/24.3.x/reference/api/#limit-and-offset-query-parameters
[Budibase development environment]: https://docs.budibase.com/docs/custom-plugin