I've some pretty fun plans for the london underground data but this is mostly me just testing out scripting in node

Original CSV files sourced from https://commons.wikimedia.org/wiki/London_Underground_geographic_maps/CSV
I've rebuilt the relational database with foreign keys but the links currently have a lot of redundant entries I'll remove soon via queries, this might actually be useful to others and you're welcome to tweak it.

Routes which contain an asterisk in their name are ones in which there are multiple variances of the line. As I've built up strictly linear routes I'm using the asterisk as a means to filter them out from my own operations.

Changes/extensions will be applied as I find them, and these files may be replaced by better alternatives at a later date.
Numerous stations are not included in the given dataset (e.g. Stratford International), for the purposes of simplicity, I shall skip those here for now.

Line order will be determined on the basis of North to South and West to East for the majority of the time but I won't focus on it so much. Lines with multiple variations are treated as multiple different lines here

Possible Explorations:
 - Modular tracks
 - Adding new stations (lets get the DLR right, at least?)
 - Figure out what to do with lines that end on a loop (Central line, I'm looking at you!), an extra "loops to" column would solve it

