<h1 align="center">chess-backend</h1>

<h3 align="center">

Chess Backend used by [Chess-PWA](https://github.com/ildar-icoosoft/chess-pwa)

</h3>

- API methods
  - Users
    - [Login](#usecombinedrefs)
    - [SignUp](#vdvfv)
    - [Logout](#vdvfv)
    - [Get users list](#getlist)
    - [Get current user](#a)
  - Games
    - [Get games list](#aa)
    - [Get single game](#aa)
    - [Make move](#aa)
    - [Abort a game](#aa)
    - [Resign a game](#aa)
    - [Create or accept draw offer](#aa)
    - [Decline draw offer](#aa)
  - Challenges
    - [Challenge AI](#aa)
    - [Challenge AI](#aa)

## Users

### /api/v1/entrance/login

#### PUT
##### Summary

Login

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body | User credentials | Yes | [LoginInput](#logininput) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [User](#user) |
| 401 | The provided email and password combination does not match any user in the database |  |

### /api/v1/entrance/signup

#### POST
##### Summary

Sign up

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body | User's credentials and full name | Yes | [SignUpInput](#signupinput) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [User](#user) |
| 400 | The provided fullName, password and/or email address are invalid |  |
| 409 | The provided email address is already in use |  |

### /api/v1/account/logout

#### POST
##### Summary

Log out of this app

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 302 | The requesting user agent looks to be a web browser |

### /api/v1/account/me

#### GET
##### Summary

Get current user data

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [User](#user) |
| 401 | User is not authenticated |  |

### /api/v1/user

#### GET
##### Summary

Get users list

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [ [User](#user) ] |

## Games

### /api/v1/game

#### GET
##### Summary

Get games list

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [ [Game](#game) ] |

### /api/v1/game/{gameId}

#### GET
##### Summary

Get single game

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| gameId | path | ID of the game | Yes | integer |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [Game](#game) |

### /api/v1/board/game/{gameId}/move/{move}

#### POST
##### Summary

Make a board move

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| gameId | path | ID of the game | Yes | integer |
| move | path | The move to play, in UCI format (for example e2e4) | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [Game](#game) |
| 401 | User is not authenticated |  |
| 403 | Invalid move |  |
| 404 | Game not found |  |

### /api/v1/board/game/{gameId}/abort

#### POST
##### Summary

Abort a game

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| gameId | path | ID of the game | Yes | integer |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [Game](#game) |
| 401 | User is not authenticated |  |
| 404 | Game not found |  |

### /api/v1/board/game/{gameId}/resign

#### POST
##### Summary

Resign a game

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| gameId | path | ID of the game | Yes | integer |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [Game](#game) |
| 401 | User is not authenticated |  |
| 404 | Game not found |  |

### /api/v1/board/game/{gameId}/draw/yes

#### POST
##### Summary

Create or accept draw offer

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| gameId | path | ID of the game | Yes | integer |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [Game](#game) |
| 401 | User is not authenticated |  |
| 404 | Game not found |  |

### /api/v1/board/game/{gameId}/draw/no

#### POST
##### Summary

Decline draw offer

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| gameId | path | ID of the game | Yes | integer |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [Game](#game) |
| 401 | User is not authenticated |  |
| 404 | Game not found |  |

## Challenges

### /api/v1/challenge/ai

#### POST
##### Summary

Start a game with AI

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body | ChallengeInput object | Yes | [ChallengeAiInput](#challengeaiinput) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [Game](#game) |
| 401 | User is not authenticated |  |

## Seeks

### /api/v1/seek

#### GET
##### Summary

Get seeks list

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [ [Seek](#seek) ] |

### /api/v1/board/seek

#### POST
##### Summary

Create a public seek, to start a game with a random player

##### Description

The response is streamed but doesn't contain any information.<br/>Keep the connection open to keep the seek active.<br/>If the client closes the connection, the seek is canceled.<br/>If the seek is accepted, or expires, the server closes the connection.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body | ChallengeInput object | Yes | [CreateSeekInput](#createseekinput) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [Game](#game) |
| 401 | User is not authenticated |  |
| 404 | Seek not found. The connection may have been aborted by the client |  |

### /api/v1/board/seek/{seekId}/accept

#### POST
##### Summary

Accept seek

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| seekId | path | ID of seek to accept | Yes | integer |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [Seek](#seek) |
| 401 | User is not authenticated |  |
| 404 | Seek not found |  |

## Chat messages

### /api/v1/board/game/{gameId}/chat

#### GET
##### Summary

Get chat messages

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| gameId | path | ID of the game | Yes | integer |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [ [ChatMessage](#chatmessage) ] |
| 404 | Game not found |  |

#### POST
##### Summary

Create chat message

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| gameId | path | ID of the game | Yes | integer |
| body | body | CreateChatMessageInput object | Yes | [CreateChatMessageInput](#createchatmessageinput) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [ChatMessage](#chatmessage) |
| 401 | User is not authenticated |  |
| 404 | Game not found |  |

### Models

#### LoginInput

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| emailAddress | string (email) | The email to try in this attempt, e.g. "irl@example.com" | Yes |
| password | string | The unencrypted password to try in this attempt, e.g. "passwordlol" | Yes |
| rememberMe | boolean | Note that this is NOT SUPPORTED when using virtual requests (e.g. sending requests over WebSockets instead of HTTP) | No |

#### SignUpInput

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| fullName | string | The user's full name<br>_Example:_ `"Frida Kahlo de Rivera"` | Yes |
| email | string (email) | The email to try in this attempt, e.g. "irl@example.com" | No |
| password | string | The unencrypted password to try in this attempt, e.g. "passwordlol" | Yes |

#### ChallengeAiInput

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| level | integer | AI strength (1 - 4) | Yes |
| clockLimit | integer | Clock initial time in seconds (60 - 10800) | Yes |
| clockIncrement | integer | Clock increment in seconds (0 - 60) | Yes |
| color | string | Which color you get to play<br>_Enum:_ `"random"`, `"white"`, `"black"` | Yes |

#### CreateSeekInput

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| clockLimit | integer | Clock initial time in seconds (60 - 10800) | Yes |
| clockIncrement | integer | Clock increment in seconds (0 - 60) | Yes |
| color | string | Which color you get to play<br>_Enum:_ `"random"`, `"white"`, `"black"` | Yes |

#### CreateChatMessageInput

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| text | string | Text of the message | Yes |

#### User

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | integer |  | No |
| createdAt | integer | Creation date in unix timestamp format | No |
| fullName | string | Full representation of the user's name<br>_Example:_ `"Mary Sue van der McHenst"` | No |
| isOnline | boolean | true if user is online | No |

#### Seek

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | integer |  | No |
| createdAt | integer | Creation date in unix timestamp format | No |
| clockLimit | integer | Clock initial time in seconds (60 - 10800) | No |
| clockIncrement | integer | Clock increment in seconds (0 - 60) | No |
| color | string | Which color you get to play<br>_Enum:_ `"random"`, `"white"`, `"black"` | No |
| createdBy | [User](#user) |  | No |
| game | [Game](#game) |  | No |

#### ChatMessage

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | integer |  | No |
| createdBy | [User](#user) |  | No |
| game | integer | game ID | No |
| text | string | Text of the message | No |

#### Game

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | number |  | No |
| initialFen | string | \\'startpos\\' or position in FEN format<br>_Example:_ `"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"` | No |
| wtime | integer | White time in msec<br>_Example:_ `300000` | No |
| btime | integer | Black time in msec<br>_Example:_ `300000` | No |
| clockLimit | integer | Clock initial time in seconds (60 - 10800) | No |
| clockIncrement | integer | Clock increment in seconds (0 - 60) | No |
| aiLevel | integer | AI strength (1 - 4). If game is not against AI then value is NULl | No |
| moves | string | _Example:_ `"e2e4 e7e5 g1f3"` | No |
| status | string | Game status<br>_Enum:_ `"started"`, `"resign"`, `"stalemate"`, `"mate"`, `"draw"`, `"aborted"`, `"outoftime"` | No |
| turn | string | Turn to move<br>_Enum:_ `"white"`, `"black"` | No |
| winner | string | Winner of the game<br>_Enum:_ `"white"`, `"black"` | No |
| drawOffer | string | draw offer from white or black<br>_Enum:_ `"white"`, `"black"` | No |
| lastMoveAt | integer | A JS timestamp (epoch ms) representing the moment at which the last move was made | No |
| white | [User](#user) |  | No |
| black | [User](#user) |  | No |
