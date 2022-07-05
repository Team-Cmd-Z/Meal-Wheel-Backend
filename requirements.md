# Software Requirements

## Vision

**What is the vision of this product?**

- The Meal-Wheel provides users with various recipe options and user can create collections of their favorite recipes.

**What pain point does this project solve?**

- The problem of having to choose what you're going cook for dinner.

**Why should we care about your product?**

- The Meal-Wheel saves time and introduces users to different recipes.

## Scope (In/Out)

IN

- This web app will provide a wheel of different meal options.
- Users can favorite recipes they like, which will be added to their 'saved recipe' page.
- Users can also take notes on their favorited recipes.
- This web app allows users to log in to view their personalized collectiono of recipes.

OUT

- This website will never turn into an IOS or Android app.

## MVP Features

### Home Page

- Displays a colorful wheel with sections of various cuisines that can be spun by a user to select a random cuisine. When the wheel lands on a cuisine, the user can click 'View Recipes' to show the recipes of that cuisine.

### View Recipes

- After spinning the wheel, the recipes will be displayed below the wheel, listed as 6 Bootstrap Cards.

### Saved Recipes Page

- This page will render a list of recipes the user can save/favorite to store in their collection. Users can update and delete various recipes from saved collections as well as add notes to each recipe for future use.

### Stretch Goals

- Allow user to sort recipes by dietary restrictions.
- Separate wheels for separate categories (chicken, salads, etc.)
- User can spin another wheel on favorites page to go through recipes that they've already tried.

## Functional Requirements

- A user can log in to their a profile to view their saved recipes.
- A user who is logged in can favorite recipes and those recipes will persist in the database in their profile.

## Non-Functional Requirements

- Usability: This app be easy to navigate with the use of clearly labeled buttons and links.
- Reliability: The meal options given to the user are reliably random.

## Data Flow

- [Domain Model + Data Flow](https://www.figma.com/file/pEkToYnDUGIEcniFiL54P7/Meal-Wheel-Data-Flow?node-id=37%3A160)
