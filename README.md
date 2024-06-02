# Settlement App

## Stack

- Next.js
- TypeScript
- Axios
- SSE (Server-Sent Events)
- FSD Architectural Methodology

## Overview

This application demonstrates the interaction between two parties, PartyA and PartyB, as distinct user roles. Upon the initial screen, you will need to select your role, which will then open the corresponding interface for that role.

To observe the interaction between both parties, open PartyA in one window and PartyB in another.

## Features

### PartyA

PartyA can submit data multiple times as described in the requirements. Before sending a new amount, there is a request to update the data. If the data matches, a request for the new amount is sent. If the amounts do not match, an alert block is shown, and the new amount is not sent. Only after pressing the send button again will the request be sent.

### PartyB

PartyB receives data via SSE and always has the current state.

## Key Points

- The architecture follows the FSD methodology: [Feature-Sliced Design](https://feature-sliced.design/).
- An Axios abstraction is implemented for typing Axios and standardizing responses in `src/shared/lib/axios/index.ts`. This is a template from my projects.

## Running the App

To run the app, follow these steps:

```bash
# Install dependencies
yarn install

# Start the development server
yarn dev
