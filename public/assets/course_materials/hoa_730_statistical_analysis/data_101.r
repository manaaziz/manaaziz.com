#===============================================================================
# LIBRARIES
#===============================================================================
if (!require("pacman")) install.packages("pacman")
pacman::p_load(
  tidyverse
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
wines <- read.csv(file.path(data_path, "winequality.csv"))

#===============================================================================
# WORKING WITH THE DATA
#===============================================================================
wines %>% colnames()
wines %>% head()
wines %>% View()
wines %>% summary()
wines$fixed.acidity %>% summary()
wines$alcohol %>% quantile(.2)
wines$alcohol %>% max(na.rm = TRUE)

# create the high quality variable
wines <- wines %>%
  dplyr::mutate(
    high_quality = ifelse(quality > 6, 1, 0)
  )

# grab only red wines
red_wines <- wines %>%
  dplyr::filter(Wine == "Red")

  
red_wines %>% filter(high_quality == 1) %>% nrow()
pcnt_high_quality_red <- red_wines %>% pull(high_quality) %>% mean()
pcnt_high_quality_white <- wines %>% filter(Wine == "White") %>% pull(high_quality) %>% mean()
  
# select certain variables
wines_small <- wines %>%
  dplyr::select(fixed.acidity, volatile.acidity, citric.acid, Wine, high_quality)

wines_small %>%
  dplyr::group_by(Wine) %>%
  dplyr::summarize(
    avg_fixed = mean(fixed.acidity),
    avg_volatile = mean(volatile.acidity)
  )

wines_small %>%
  dplyr::group_by(Wine) %>%
  dplyr::summarize(
    n = n(),
    pcnt_high_quality = mean(high_quality, na.rm = TRUE) 
  ) %>%
  dplyr::ungroup()

wines %>%
  dplyr::group_by(Wine) %>%
  dplyr::summarize(
    unique_ph = n_distinct(pH)
  ) %>%
  dplyr::ungroup()

t.test(fixed.acidity ~ Wine, data = wines) 
shapiro.test(wines %>% filter(Wine == "White") %>% pull(fixed.acidity))

wines %>%
  dplyr::summarize(
    n = n(),
    pcnt_high_quality = mean(high_quality, na.rm = TRUE)
  )

prop.test()



