https://bitbucket.org/atlassian/developer-day-customizing-jira-with-forge/src/main/02-product-events/

# Product Events and Product Triggers

## Create the app

1. Create the app

    * In your terminal, shell, or command prompt, call
  
        ```
        forge create
        ```
  
    * Enter an app name
  
        ```
        ? Enter a name for your app: Hello Product Trigger
        ```

2. Select a template

```
? Select a category: Show All
? Select a template: product-trigger
```

3. Let's modify the files 
    
    * Update `index.jsx` and log the event payload. Inside the function `run` add
    
        ```
        console.log(event);
        ```

4. Deploy the app

    * Change to your project directory
  
        ```
        cd Hello-Product-Trigger
        ```
  
    * Run the Forge deployment command
  
        ```
        forge deploy
        ```
  
    * You will get an error like this
  
        ```
        1:0 error Trigger event: 'avi:jira:created:issue' requires 'read:jira-work' scope  permission-scope-required

        X 1 issue (1 error, 0 warnings)
          Run forge lint --fix to automatically fix 1 error and 0 warnings.
        ```
  
    * Fix the error by calling
  
        ```
        forge lint --fix
        ```
  
    * Deploy the app again
  
        ```
        forge deploy
        ```

5. Install the app

    * Run the command
  
        ```
        forge install
        ```

    * Select the product
  
        ```
        ? Select a product: Jira
        ```
  
    * Enter your site / cloud instance URL
  
        ```
        ? Enter the site URL: my-site.atlassian.net
        ```
  
    * Accept the prompt to continue with the installation
  
        ```
        ? Do you want to continue? Y
        ```
        
6. Run the tunnel to see the logs

```
forge tunnel
```
  
## Verifying if the app is installed
1. Go to your Jira instance.

2. Open an issue. If you do not have one, create one.

3. Create a new issue

4. Go to your terminal and check the logs. "Hello World!" should be there as well as the event payload.