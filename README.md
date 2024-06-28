# Budibase-datasource-dremio

A [Dremio] datasource for [Budibase]

Find out more about [Budibase].

## Vision

With this plugin, build internal tools in minutes,
leveraging the information from your semantic data layer in [Dremio].

Quickly plug the holes in your application landscape NOW
and get back to work.

## Features

Retrieve up to 500 rows from any table view in your [Dremio] data lakehouse.

## Backlog

* Add Dremio icon.
* Add License.
* Publish on Github.
* Write installation instruction.
* Ask for a code review on Budibase Discord
  * Investigate logging, how to do this in Budibase plugins? How to read them conveniently?
  * Write some decent tests.
  * Coding guidelines for writing Budibase plugins with Typescript.
  * How to include vanilla js node modules in a Typescript app.
* Get query string escaping right (e.g. quoted identifiers in [Dremio]).
* Page through results for result sets exceeding 500 rows, try to align this with however BB does this.
  In Dremio, we can use [offset- and limit parameters].
  An the job has information about the number of records.  

## Out of scope (for now)

* _Create, Update, and Delete queries._ We treat the Dremio data lakehouse as a read-only datasource.

## Instructions

Work in progress, see [my public learning log here](https://serra.fibery.io/Public/Learnings-by-State-80#Learning/Connect-Dremio-to-budibase-207).

---

[Dremio]: https://github.com/dremio/dremio-oss
[Budibase]: https://github.com/Budibase/budibase
[offset- and limit parameters]: https://docs.dremio.com/24.3.x/reference/api/#limit-and-offset-query-parameters