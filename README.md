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

Or to run tests:

```bash
npx jest --detectOpenHandles --watchAll
```


## Backlog

* Write installation instruction, and test that it works.
  Installation notes in readme. Small demonstration video / gif showing that it works.
* Ask for a code review. Any feedback is welcome.
  * How to do logging in Budibase plugins? How to read them conveniently?
  * How to write and run tests.
  * What are the coding guidelines for writing Budibase plugins with Typescript.
  * How to include vanilla js node modules in a Typescript app? Is my `rollup.config.js` configured correctly?
  * How to setup github action that automatically tests and deploy?
* Page through results for result sets exceeding 500 rows, try to align this with however BB does this.
  In Dremio, we can use [offset- and limit parameters].
  And the job has information about the number of records.
* Get query string escaping right (e.g. quoted identifiers in [Dremio]).

## Out of scope (for now)

* _Create, Update, and Delete queries._ We treat the Dremio data lakehouse as a read-only datasource.

## Instructions

Work in progress, see [my public learning log here](https://serra.fibery.io/Public/Learnings-by-State-80#Learning/Connect-Dremio-to-budibase-207).

---

[Dremio]: https://github.com/dremio/dremio-oss
[Budibase]: https://github.com/Budibase/budibase
[offset- and limit parameters]: https://docs.dremio.com/24.3.x/reference/api/#limit-and-offset-query-parameters
[Budibase development environment]: https://docs.budibase.com/docs/custom-plugin