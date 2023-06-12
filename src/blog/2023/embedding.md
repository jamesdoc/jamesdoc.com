---
title: Embedding your blog
date: 2023-06-12
type: article
author: James Doc
intro: How the technology behind ChatGPT can be used to create a more conversational style search for your blog.
tags: ["tech"]
---
**In some research and development time I've been exploring some of the technology behind ChatGPT, and pulling on different contexts for uses of it.** One of the more interesting areas where I've seen this applied is using a conversational interface. An interface where a user can search a knowledge base, blog posts, set of articles, etc and return not just a set of links (eg as a traditional search engine would), but a couple of paragraphs which answer the question that has been asked.

Behind the scenes, the process of making this possible can be boiled down to a couple of steps:

1. Convert the user's search query into a numerical representation.
2. Find the closest (or nearest) blog post that matches the numerical version of the search term.
3. Put the original question and the returned blog post through a Large Language Model (LLM) to answer the question.

## Numerical representations?

Even though we've had search engines for a while, search is not a solved problem. And embeddings are a new tool to help go from a question; to a set of search results.

Consider the following sentences:

1. The motor in the car is broken
2. The giraffe has a long neck
3. The engine in the automotive is defective

As a human reading those items we know that item one and three are pretty much identical, and number two is very different. If we were to plot the sentences by the levels of similarity on a line it would look something like one and three about broken cars being grouped together, and then a long way away the line about the giraffe.

```mermaid
|--1-3----------------------------2--|
```

Now, if we were to introduce a new sentence about a camel with a long neck we would group it closer to the second sentence. They are both animals with long necks.

This is what is happening with embeddings[^1]. Embeddings are a tool which take a phrase, or a whole blog post, and converts their meaning into a numerical representation. What's interesting about these embeddings is that you can then start to compare them, or find embeddings that are numerically close.

This is how a new form of search can work– a search term is converted into a numerical format, and then a database of blog posts with their related embeddings can be queried for the closest numerical match or matches. With this list of results we can then give the user a list of blog posts where they might find a good answer.

## We can go better than just a list of blog posts…

Now that we've got a set of results that are similar to the question, and therefore probably answer the question, we can return the blog posts as a list… as every other search engine does. But Large Language Models enable us to give a little bit extra.

LLMs are really good at summarising content, and you can also give them direction regarding how to summarise that content. So what we can do here is send the content from the closest matched article and the question into the model and then give the LLM a task of taking that content and summarising it with a view on the question.

Now, while you could remove the traditional search listing here, there are plenty of good reasons to keep it in such as the LLM may completely miss the mark on the question, or the user might want to read more information directly from where the answer came from.

## Implementing the technology behind this…

### Embeddings

To do the embedding matching you need to have a database that is able to store and do the comparisons of the embeddings; there are specific products that you can get for this such as [Pinecone](https://www.pinecone.io/). However if, like me, you'd rather not pump your data into another hosted <abbr title="Software as a Service">SaaS</abbr> platform there is an extension for pSQL databases called [pgVector](https://github.com/pgvector/pgvector) which does the job nicely. If you're using AWS, [RDS has pgVector installed](https://aws.amazon.com/about-aws/whats-new/2023/05/amazon-rds-postgresql-pgvector-ml-model-integration/) by default in all 15.2+ databases, you just need to enable the extension.

There are a number of different services that you can use to generate the embeddings, but OpenAI's API is wonderfully simple to use, so it's a good place to start. You take a string an send it across:

```js
const { Configuration, OpenAIApi } = require("openai");

// Generate embeddings for given content
const getEmbeddings = async (content) => {
 const configuration = new Configuration({ apiKey: process.env.OPEN_AI })
 const openAI = new OpenAIApi(configuration)

 const embeddings = await openAI.createEmbedding({
 model: 'text-embedding-ada-002',
 input: content,
  });

 return embeddings;
}
```

### Completions

Completions is the technology that you see behind ChatGPT where the LLM _completes_ based on a prompt text. In our example you have to feed a prompt which contains the blog post returned as the closest match from the embedding search, and the question that is being asked of it.

Obviously here's where you need to be careful about what you're feeding in; you'll want to be careful that you're not sending across a load of user data as part of that prompt.

```js
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({ apiKey: process.env.OPEN_AI });
const openAI = new OpenAIApi(configuration);

// Answer a question based on a given blog post
const answerQuestion = async (question, contextText) => {
 const prompt = `
    You are an assistant who provides answers to questions.

    Given the following context, answer the question using only
    that information. If you are unsure, or the answer is not
    explicitly written in the context, say "Sorry, I don't know
    how to help with that."

    Context: """
 ${contextText}
    """

    Question: """
 ${question}
    """
  `;

 const completionResponse = await openAI.createCompletion({
 model: 'text-davinci-003',
 prompt,
  });

 return completionResponse;
}
```

## Wrapping up

By combining embedding generation and completions, you can then make an interface which provides answers based on your company's knowledge base on blog posts. It's neat, and not overly complicated to do. With all things that rely on external APIs though; you've got to be careful of the price, and what happens if that API goes away (see also Twitter and Reddit APIs).

[^1]: Yes, embeddings are slightly more complicated than that… but I didn't take maths beyond my GCSEs, so I'm going to keep it simple here.

