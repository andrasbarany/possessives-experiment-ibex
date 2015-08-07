library(IBEX.to.R)

# load the results from "results.txt" and ignoring some of the columns

alldata_results = get.results("results.txt", "AcceptabilityJudgment", del.col = c(2, 3, 4, 5, 7, 10, 11))

# delete the second empty line in alldata_results

data_results = subset(alldata_results, Col9 != "")

# remove fillers and practice sentences

data_results = subset(data_results, type != "practice")
data_results = subset(data_results, grepl("^t-.*", data_results$type))

# rename Col8 and Col 9 to something more useful:

names(data_results)[3] <- "sent"
names(data_results)[4] <- "ans"

# the following turns the "type" into a factor

data_results$type = as.factor(data_results$type)

# getting blokks A and B is easy:

blokkA <- data_results[data_results$type=="t-A2-mar-ext-sbj-2", ]$subject
blokkB <- data_results[data_results$type=="t-B2-mar-nil-sbj-n", ]$subject
blokkC <- alldata_results[alldata_results$type=="tf39", ]$subject

blokkA <- droplevels(blokkA)
blokkB <- droplevels(blokkB)
blokkC <- droplevels(blokkC)

# Now what?
