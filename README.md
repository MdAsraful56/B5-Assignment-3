# B5-Assignment-3

# Library Management API

#### Here, all card operations have been used for books in a library. In addition, a few operations have been used for borrowing books.Here I used Express, MongoDB, mongoose


## Books 

####  একই লাইব্রেরীতে বইয়ের জন্য যেগুলো কার্ড অপারেশন ব্যবহার করা হয় এগুলার সব ব্যবহার করা হয়েছে ।

### 🧩 GET -> All Books

####  এটি ব্যবহার করে আপনি সকল বইকে দেখিতে পারবেন ।

```
https://assignment-3-kappa-azure.vercel.app//api/books
```
```
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "_id": "64f123abc4567890def12345",
      "title": "The Theory of Everything",
      "author": "Stephen Hawking",
      "genre": "SCIENCE",
      "isbn": "9780553380163",
      "description": "An overview of cosmology and black holes.",
      "copies": 5,
      "available": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    }
    {...}
  ]
}
```

### 🧩 GET -> All Books filter 

####  এটি ব্যবহার করে আপনার সকল বই দেখতে পারবেন তাও নির্দিষ্ট মতন নিজের ইচ্ছামতন ফিল্টার করে ।

```
https://assignment-3-kappa-azure.vercel.app//api/books/?filter=FANTASY&sortBy=createdAt&sort=desc&limit=2
```



### 🧩 POST -> Create a Single Books

####  এটি ব্যবহার করে কোন ডকুমেন্ট তৈরি করিতে পারবেন ।

```
https://assignment-3-kappa-azure.vercel.app//api/books
```

```
{
  "title": "The Time Machine",
  "author": "H.G. Wells",
  "genre": "FICTION",
  "isbn": "9780451528551",
  "description": "A science fiction novel that explores time travel and dystopian futures.",
  "copies": 10,
  "available": true
}

```

### 🧩 PATCH -> Update Single Books

#### এটি ব্যবহার করে কোন ডকুমেন্ট আপডেট করতে পারবেন নির্দিষ্ট আইডি অনুসারে ।


```
https://assignment-3-kappa-azure.vercel.app//api/books/:bookId
```

### 🧩 DELETE -> Delete Single Books

####  এটি ব্যবহার করে কোন ডকুমেন্ট ডিলেট করতে পারবেন তার নির্দিষ্ট আইডি অনুসারে ।

```
https://assignment-3-kappa-azure.vercel.app//api/books/:bookId
```



## Borrow 


### 🧩 GET -> Get Borrow 

#### এটি মাধ্যমে সব মিলে কয়টি বই নিয়েছে সবগুলো একসাথে দেখা যায় ।

```
https://assignment-3-kappa-azure.vercel.app//api/borrow 
```
```
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
```


### 🧩 POST -> Create a Single Borrow 

####  এটার মাধ্যমে কেউ কোন বই নিবে কিনা ওইটি নির্দিষ্ট ভাবে পোস্ট করা যায় ।

```
https://assignment-3-kappa-azure.vercel.app//api/borrow 
```
```
{
    "book": "68579f6f530083a0c3511753",
    "quantity": 10,
    "dueDate": "2026-06-26T18:25:42.953+00:00"
}

```

### 🧩 DELETE -> Delete a Single Borrow 

#### এটার মাধ্যমে কেউ বই জমা দিলে তার পোস্টটি ডিলিট করা যায় ।

```
https://assignment-3-kappa-azure.vercel.app//api/borrow/:borrowId
```


## 🧩 Error 

#### যদি আপনি কোন ভুল রাউট দিয়ে থাকেন তাহলে এইখানে এই ইরোর হ্যান্ডিং এর মাধ্যমে নির্দিষ্ট একটি মেসেজ প্রদান করিবে ।