---
title: "Using Elm instead of React and TypeScript"
description: ""
date: "2016-10-18"
---

Recently I republished a post about [TypeScript and React](https://medium.com/out-of-memory/typescript-with-react-and-jsx-2749eac50bfa#.dsm4a48sp) . It got me thinking about recent elm experience and how it could be the better choice.

Do you like the React and Redux architecture for your apps? And do you prefer better autocomplete and more type safety provided by TypeScript, but do not like how TypeScript makes you work to tell it all the types?

You might enjoy [Elm](http://elm-lang.org/) language after you see what it has to offer.

Elm is a functional language, built to develop user interfaces and the output compiles to JavaScript. Since it's not building directly on top of JavaScript, it can go around most of the JavaScript quirks. It is strongly typed but has great type inference, so you do not have to specify types yourself.

There is also a claim that Elm code has 0 runtime exceptions. From my experience, this is true. The compiler will catch and make you fix those errors before continuing.

It's another language, bringing its ecosystem. Authors have to develop modules in Elm for the developer to import and use them. It does supports interoperation with JavaScript, so one still can use JavaScript code from Elm. But sadly, this is the part where you could still get a runtime error since the Elm compiler doesn't know what is going on in the JavaScript code.

The core idea you see in Redux of having an atomic and immutable state, which updates through actions was inspired by [the Elm Architecture](https://guide.elm-lang.org/architecture/) . I got that information from [The Changelog podcast 187](https://changelog.com/podcast/187) with Dan Abramov, the author of Redux. In this podcast, he talked about the idea of Redux and how the Elm white paper inspired it.

Also, developers of Elm work with great developer experience in mind. You can see this reflected by the compiler, which tells you what you did wrong, and it will direct you towards fixing the issue. There are even editor tools which know how to use this information to auto-fix the issue.

If you are interested in using Elm, the official webpage has a great guide on getting started. It's of great help even when you build up to more advanced stuff.

While it's easy to switch technology when starting a new project, the biggest issue can be integrating it with an existing app. [How to Use Elm at Work](http://elm-lang.org/blog/how-to-use-elm-at-work) is a great short post by Evan Czaplicki, the author of Elm on the topic. It demonstrates how one would start rewriting existing code to Elm, one component at a time.

I was working with Elm for [my final thesis, "Assessing the suitability of Elm language for developing web applications"](http://eprints.fri.uni-lj.si/4111/) . In this thesis, I am comparing a React project to the same implementation, feature-for-feature, in Elm. Sadly the thesis is available only in the Slovene language.

To conclude with a disclaimer, I do not have experience with Elm in production systems. My knowledge so far is based on personal projects, and writings of others. But I would like to experience a substantial Elm project first-hand.
