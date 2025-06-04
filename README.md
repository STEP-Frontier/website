# STEP webpage source code

## Getting Started

First, run the development server:

```bash
# Clone this repository
git clone https://github.com/STEP-Frontier/step-webpage-code.git # Or you can use ssh
cd step-webpage-code

# Install package
npm install

# Run
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

After you did some commit:

```bash
npm run build
```

Then `/out` will be generated. 

Next, go to `step-frontier.github.io` directory where the previous compiled website files are saved. 

Delete all files inside EXCEPT FOR `.git`, `.gitignore` and `.nojekyll` (VERY IMPORTANT). 

After deleted all other files, move all files you have just generated in `/out` into `step-frontier.github.io`, then commit and push. 

The deployment should be completed in one or two minutes. 

## To do
- CanSat page
- Sort news in mobile device (No problem with PC device)
- Arrange rocket project info into json file
- Complete readme tutorial

# Memo
**03-24**\
Completed main page

**03-23**\
Completed better navbar design\
Users are now able to close menu by clicking other place on the screen