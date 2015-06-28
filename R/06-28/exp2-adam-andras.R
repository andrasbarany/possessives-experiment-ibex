#object agreement experiment 2 analysis

#using package IBEX.to.R

library(IBEX.to.R)

#make data frame from data that has been downloaded from IBEX

allData = get.results("ibex_results.txt", "AcceptabilityJudgment", 
                        del.col = NULL)


#make data set that only has second line as suplied by IBEX, 
#this one contains the response 

responseData = subset(allData, Col9 != "")

#take out fillers and practice

responseData = subset(responseData, type != "filler")

responseData = subset(responseData, type != "practice")


#exclude NULL levels, make into factor 

responseData$types = as.factor(responseData$types)


#the names of types have been broken up in a seperate text file 
#which is now used to introduce these into the data fram

key = read.table("typeskey.txt", header = T, sep = "\t")

#merge the two tables

dataFactors = merge(responseData, key, by = "type")

#seperate to things that should be compared into different data.frames

block1subject = as.data.frame(A)

block2subject = as.data.frame(B)

block3subject = as.data.frame(C)



#for subset comand use: droplevels(subset(...))


#reset name of Col9 to response

names(block3)[names(block3) == 'Col9'] <- 'response'

#boxplots

boxplot(response ~ possessor+agreement+condition, data = block1, las=2, main = "block1")

boxplot(response ~ possessor+agreement+condition, data = block2, las=2, main = "block2")

boxplot(response ~ possessor*agreement+condition, data = block3, las=2, main = "block3")

#Comparisons to be made 

#A1-A2-A3 from Block 3      A
#A1-A2-B1-B2 from Block 1   B
#C2-C3 from Block 3         C
#C1-C2 from Block 2         D
#C1-A1 from block 2         E  
#C1-A2 from Block 2         F


#make more comparible dataframes

comparisonA = rbind("droplevels(subset(block3, block3$condition=="A1"))",
              "droplevels(subset(block3, block3$condition=="A2"))",
                    "droplevels(subset(block3, block3$condition=="A3"))" )


#Comparison A: nominative vs dative possessor postV position
#results block 1&2

nomDat = droplevels(subset(block1, block1$condition == "A1"))

boxplot(response ~ possessor+agreement, data = nomDat, main = "block1 nom vs dat")

nomDat2 = droplevels(subset(block2, block2$condition == "A1"))

boxplot(response ~ possessor+agreement, data = nomDat2, main = "block2 nom vs dat")

nomDatAll = rbind(nomDat, nomDat2)

boxplot(response ~ possessor+agreement, data = nomDatAll, main = "block1&2 nom vs dat")


#repeated measures anova 

aov_basic = aov(response ~ possessor*agreement + 
                  Error(subject/(possessor*agreement)), 
                        data = nomDatAll)
                
summary(aov_basic)

#Comparison A1 = normal, word order variation and extraction with dative possessor
#made from results in block 3

a1 = droplevels(subset(block3, block3$condition=="A1"))
a2 = droplevels(subset(block3, block3$condition=="A2"))
a3 = droplevels(subset(block3, block3$condition=="A3"))

comparisonA = rbind(a1, a2, a3)

boxplot(response ~ possessor+agreement, data = comparisonA, 
        subset = condition =="A1", at = 1:6, boxwex = 0.50) 

boxplot(response ~ possessor+agreement, data = comparisonA, 
        subset = condition =="A2", at = 1:6, add = T, boxwex = 0.50) 

boxplot(response ~ possessor+agreement, data = comparisonA, 
        subset = condition =="A3", at = 1:6, add = T, boxwex = 0.50,
        main = "Dat possessor: normal, extracted, word order"
        ) 




#comaprison B: A1 and B1 basic senteces vs those with modifiers 
#data: from block 1


b1 = droplevels(subset(block1, block1$condition=="B1"))
block1a1 = droplevels(subset(block1, block1$condition =="A1"))
comparisonB1 = rbind(block1a1, b1)

boxplot(response ~ possessor+agreement, data = comparisonB1, 
        subset = condition =="A1", at = 1:4 - 0.25, boxwex = 0.3,
        names = c("A1.dat.obj", "A1.nom.obj", "A1.dat.sbj", "A1.dat.sbj"), 
        las = 2) 

  boxplot(response ~ possessor+agreement, data = comparisonB1, 
          subset = condition =="B1", at = 1:4  + 0.25, boxwex = 0.3, add = T,
          names = c("B1.dat.obj", "B1.nom.obj", "B1.dat.sbj", "B1.dat.sbj"), 
          las = 2,
          main = "A1 baseline vs B1 modifier"
          ) 



# Comparison B2 ...


#Comparison C: negation 

c1 = droplevels(subset(block2, block2$condition =="C1"))
block2A1 = droplevels(subset(block2, block2$condition =="A1"))

negationBasic = rbind(c1, block2A1)


boxplot(response ~ possessor+agreement, data = negationBasic, 
        subset = condition =="A1", at = 1:4 - 0.25, boxwex = 0.3,
        names = c("A1.dat.obj", "A1.nom.obj", "A1.dat.sbj", "A1.nom.sbj"), 
        las = 2) 


boxplot(response ~ possessor+agreement, data = negationBasic, 
        subset = condition =="C1", at = 1:4  + 0.25, boxwex = 0.3, add = T,
        names = c("C1.dat.obj", "C1.nom.obj", "C1.dat.sbj", "C1.nom.sbj"), 
        las = 2,
        main = "A1 baseline vs C1 negation")



#comarison C2: preverbal negation focus vs V
c2 = droplevels(subset(block3, block3$condition=="C2"))
c3 = droplevels(subset(block3, block3$condition=="C3"))
negationPreV = rbind(c2, c3)

boxplot(response ~ possessor+agreement, data = negationPreV, 
        subset = condition =="C2", at = 1:2 - 0.25, boxwex = 0.25,
        names = c("V.dat.obj", "V.dat.sbj") 
        ) 

boxplot(response ~ possessor+agreement, data = negationPreV, 
        subset = condition =="C3", at = 1:2  + 0.25, boxwex = 0.25, 
        names = c("F.dat.obj", "F.dat.sbj"),
        add = T ) 





boxplot(response ~ possessor+agreement, data = negationPreV, 
        subset = condition =="C3", at = 1:2 + 0.5, boxwex = 0.3,
        names = c("F.dat.obj", "F.dat.sbj"), 
        add = T) 




#To do

# extract subject metadata
# figure out how to analyse the differences between distributions of dative possessor as compared to nominatives
# is this importan?

# do remaining anovas
# mixed models? wold it be useful in this analysis?




#Exploring high degree of variation in responses for Dative possessor, obj agreement

# responses seem to how high level of variance in conditions were there is a dative possessor with obj agreement

#make data frame continting only this condition 

datOnly = droplevels(subset(nomDatAll, nomDatAll$possessor=="dat"))

dat_obj = droplevels(subset(datOnly, datOnly$agreement=="obj"))


#What accounts for variation 

#sentences?

boxplot(response ~ sentence, data = dat_obj)

#there seem to be differences 
#'jul', 'mar' better than 'ada', 'pet' although probably not significantly....


#anova

datSentences_aov = aov(response ~ sentence + 
                         Error(subject/sentence), 
                        data = dat_obj)


summary(datSentences_aov)

#there seems to be a significant effect 

#pairwise t test with bonferoni correction to see which comparisions are sig.

pairwise.t.test(dat_obj$response, dat_obj$sentence, p.adj = "bonf")

# ada vs jul,mar,pet = this one sentence seems to be significantly worse than
#the other three...



#get subject meta data

subjectData = get.results("ibex_results.txt", "Form", 
                      del.col = NULL)

#make data frame so that it can be use...ie reshape cols+rows

origin = droplevels(subset(subjectData, subjectData$Col8 =="place of birth"))
keep = c("subject", "Col9")
origin = origin[,keep]
#rename Col9
names(origin)[2]= "origin"

#write to table the leves of county names so as to standardize them
write.table(levels(origin$origin), "origin.txt", sep="\t", quote=F, row.names=F)

#in textedit: names were standardized as seperate column

countyOforigin = read.table("origin.txt", header=T, sep="\t")

county = merge(origin, countyOforigin, by = "origin")

#age? 

age = droplevels(subset(subjectData, subjectData$Col8 =="age"))
age = age[,keep]
names(age)[2]= "age"

subjectMeta = merge(county, age, by = "subject")

datObj_SubData = merge(dat_obj, subjectMeta, by="subject")

boxplot(response ~ county, data=datObj_SubData, las = 2)

#problem: the subjects are not evenly desributed between counties. 

#if we take only counties with high participation (10+) we see that the 
#distribution of responses seems to spread out across the sprectrum with 
#median values falling between 3 and 5. 

pairwise.t.test(datObj_SubData$response, datObj_SubData$county, p.adj="bonf")

#pairwise t test reveals that there is only one near significant difference 
#that between baranya and HB (Hajdu-Bihar), which would be nice seeing as one is 
#south west while the other is north east suggesting a possible dialectological 
#difference. But i don't think that this is supported by results from other
#counties. 



































