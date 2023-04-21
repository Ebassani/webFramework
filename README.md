# Web Framework project

## Rabbit

Rabbit is a blog wesite inspired by Reddit.com.

In the website, a user can create an account to write their own posts or comment on others.

The blog is separeted in topics(example: gaming, sports, TV), and every post is linked to a topic, so if you go to Sports you will read posts that have sports as their theme.

The connection to mongoDB Atlas is made with a link on a secrets.txt file located on webframework/, inside the file you will find the link to our database with our authentication, for privacy pourposes this file is not icluded on git, so if you wish to connect this to your own database, on your secrets.txt use the following line:

```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

Change everything inside <> to your own information, also remove the <> from the line.