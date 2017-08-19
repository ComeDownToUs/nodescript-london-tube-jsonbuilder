Original CSV files sourced from https://commons.wikimedia.org/wiki/London_Underground_geographic_maps/CSV

Changes/extensions will be applied as I find them, and these files may be replaced by better alternatives at a later date.
Numerous stations are not included in the given dataset (e.g. Stratford International), for the purposes of simplicity, I shall skip those here

Line order will be determined on the basis of North to South and West to East

Okay so this data is a mess as far as actual line structure is concerned, with this in mind I've made some compromises and a legend:
 - ! = It's the northern line, an ungodly mess, I'll figure this out either within the algorithm or some other time
 - _ = There are a whole bunch of alternate routes, I'm going with the one consistent terminus and the algorithm should just find one route through zones 1&2, that'll do for now
 - * = No consistent terminus, probably ignore for now
 - A gap of multiple lines in CSV signifies a place where I've added some entries



Possible Explorations:
 - Modular tracks
 - May be a lot easier manually for some parts with the assistance of tables built with the SQL dataset


The source code is honestly far too big of a hot mess to test well but I might have enough to get it largely working in my next run through
