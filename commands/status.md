# status — read-only, no agents

Resolve the home; ask only if ambiguous. Do not scaffold, probe writes, record supplied answers,
reconcile, update hashes on disk or dispatch.

Read `bf.py counts`, `lint`, `anchors`, `changed`, `lock` and the current questions/status. Read the last
relevant compact Checks report only when needed to assess actual review/freshness. The old last_grill
field may refer to a substantive review; old historical passes are not proof of current coverage.

Report worst first: serious Open/Flagged rows; unapplied Answered rows; markers; missing/unverified
review; stale or materially recheck facts; edits since the last snapshot; structural problems; present
ready stamp and any genuine pending owner review. A clean checker alone does not mean ready.

Unknown deployment is a disclosed fact, not automatically stale product evidence. A stopped/abandoned
writer is reported, never closed by status. Supplied answers are named as not recorded. Give one next
useful action, not a mandatory chain of intermediate commands. Write nothing.
