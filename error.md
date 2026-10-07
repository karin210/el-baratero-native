I'm getting a React Native/Expo Router warning during app startup:

**Error:**
`Can't perform a React state update on a component that hasn't mounted yet.`

React says this indicates that a side effect is happening during render and asynchronously trying to update state. It recommends moving the work into `useEffect`.

**Relevant stack trace:**
The update appears to originate from Expo Router's linking logic:

`expo-router/build/fork/useLinking.native.js:127:47`

The component stack is:

`ContextNavigator → ExpoRoot → App → WithDevTools`

The error occurs in `ExpoRoot.js` around line 135, but this may be where the problem surfaces rather than the actual source.

**Please investigate the project and identify what in my application is triggering this warning.**
Don't assume `ExpoRoot.js` itself is the problem. Check my app's startup/render logic, Expo Router configuration, navigation/linking setup, and any asynchronous state updates that could occur before a component mounts.

If you find the cause, explain it briefly and propose the appropriate fix.
