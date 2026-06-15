# LECTURE 3
# CORRELATION AND SIMPLE LINEAR REGRESSION

#===============================================================================
# LIBRARIES
#===============================================================================
if (!require("pacman")) install.packages("pacman")
pacman::p_load(
  tidyverse,
  janitor,
  corrplot
)

#===============================================================================
# SET PATHS
#===============================================================================
# set the data path
data_path <- '/Users/dgmana/Library/CloudStorage/GoogleDrive-azizsm1@unlv.nevada.edu/My Drive/Teaching/2026_spring/HOA730/data/'

# check the data path
list.files( data_path )

#===============================================================================
# READ IN THE DATA
#===============================================================================
hotels <- read_csv(file = file.path(data_path, "hotels.csv"))

# clean the names of the datasets
hotels <- janitor::clean_names(hotels)

#===============================================================================
# STUDY THE DATA
#===============================================================================
# take a look at the data
hotels %>% head()
hotels %>% colnames()
hotels %>% summary()

# check for any missing values
hotels %>% is.na() %>% colSums()

#===============================================================================
# CORRELATION
#===============================================================================
# keep only the numeric columns
hotels_num <- hotels %>%
  select(where(is.numeric))

# pairwise scatterplots to do a visual check of relationships across all variables
pairs(hotels_num)

# correlation matrices to quantify strength and direction of relationships
pearson_corr <- cor(hotels_num, method = "pearson") # pearson (linear)
spearman_corr <- cor(hotels_num, method = "spearman") # spearman (monotonic)

round(pearson_corr, 3)
round(spearman_corr, 3)


# correlation with adr (focus variable)
# which variables are most related to adr_usd?
pearson_corr[, "adr_usd"] %>%
  sort(decreasing = TRUE)

spearman_corr[, "adr_usd"] %>%
  sort(decreasing = TRUE)

# corrplot visualization for cleaner visual summary of correlation matrices
corrplot(
  pearson_corr,
  method = "color",
  type = "upper",
  tl.cex = 0.8
)

corrplot(
  spearman_corr,
  method = "color",
  type = "upper",
  tl.cex = 0.8
)

# compute correlation
cor(hotels$review_score, hotels$adr_usd, method = "pearson")

# scatterplot with fitted line
ggplot(data = hotels, aes(x = review_score, y = adr_usd)) +
  geom_point(alpha = 0.6) +
  geom_smooth(method = "lm", se = FALSE) +


# example 2: pearson vs spearman (nonlinear relationship)
# repeat visit intent vs service personalization

# compute correlations
cor(
  hotels$service_personalization_score,
  hotels$repeat_visit_intent_score,
  method = "pearson"
)

cor(
  hotels$service_personalization_score,
  hotels$repeat_visit_intent_score,
  method = "spearman"
)

# scatterplot
ggplot(data = hotels, aes(x = service_personalization_score, y = repeat_visit_intent_score)) +
  geom_point(alpha = 0.6)
  



#===============================================================================
# SIMPLE LINEAR REGRESSION
#===============================================================================

