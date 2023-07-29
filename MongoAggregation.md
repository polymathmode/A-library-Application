## Solve using your mongodb-compass aggregation tool
### Requirements:

- Import the restaurant.json file as a new collection

### Exercise:

1. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'Reg' as three letters somewhere in its name.

2. Write a MongoDB query to find the restaurants which belong to the borough Bronx and prepared either American or Chinese dish.

3. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which belong to the borough Staten Island or Queens or Bronxor Brooklyn.

4. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which are not belonging to the borough Staten Island or Queens or Bronxor Brooklyn.

5. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which achieved a score which is not more than 10.

6. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which prepared dish except 'American' and 'Chinees' or restaurant's name begins with letter 'Wil'.

7. Write a MongoDB query to find the restaurant Id, name, and grades for those restaurants which achieved a grade of "A" and scored 11 on an ISODate "2014-08-11T00:00:00Z" among many of survey dates..

8. Write a MongoDB query to find the restaurant Id, name and grades for those restaurants where the 2nd element of grades array contains a grade of "A" and score 9 on an ISODate "2014-08-11T00:00:00Z".

9. Write a MongoDB query to find the restaurant Id, name, address and geographical location for those restaurants where 2nd element of coord array contains a value which is more than 42 and upto 52..

10. Write a MongoDB query to arrange the name of the restaurants in ascending order along with all the columns.

11. Write a MongoDB query to arrange the name of the restaurants in descending along with all the columns.

12. Write a MongoDB query to arranged the name of the cuisine in ascending order and for that same cuisine borough should be in descending order.

13. Write a MongoDB query to know whether all the addresses contains the street or not.



<!-- Solution -->

1. db.allRestaurants.find({
  "name": {
    "$regex": "Reg",
    "$options": "i" // This option makes the search case-insensitive
  }
}, {
  "restaurant_id": 1,
  "name": 1,
  "borough": 1,
  "cuisine": 1,
  "_id": 0
})
2.db.allRestaurants.find({
  "borough": "Bronx",
  "$or": [
    { "cuisine": "American" },
    { "cuisine": "Chinese" }
  ]
})

3.db.allRestaurants.find({
  "borough": {
    "$in": ["Staten Island", "Queens", "Bronx", "Brooklyn"]
  }
}, {
  "restaurant_id": 1,
  "name": 1,
  "borough": 1,
  "cuisine": 1,
  "_id": 0
})

4.db.allRestaurants.find({
  "borough": {
    "$nin": ["Staten Island", "Queens", "Bronx", "Brooklyn"]
  }
}, {
  "restaurant_id": 1,
  "name": 1,
  "borough": 1,
  "cuisine": 1,
  "_id": 0
})

5.db.allRestaurants.find({
  "grades.score": { "$lte": 10 }
}, {
  "restaurant_id": 1,
  "name": 1,
  "borough": 1,
  "cuisine": 1,
  "_id": 0
})

6.db.allRestaurants.find({
  "$or": [
    {
      "cuisine": { "$nin": ["American", "Chinese"] }
    },
    {
      "name": { "$regex": "^Wil", "$options": "i" }
    }
  ]
}, {
  "restaurant_id": 1,
  "name": 1,
  "borough": 1,
  "cuisine": 1,
  "_id": 0
})

7.db.allRestaurants.aggregate([
  {
    "$match": {
      "grades": {
        "$elemMatch": {
          "grade": "A",
          "score": 11,
          "date": {
            "$eq": ISODate("2014-08-11T00:00:00Z")
          }
        }
      }
    }
  },
  {
    "$project": {
      "restaurant_id": 1,
      "name": 1,
      "grades": {
        "$filter": {
          "input": "$grades",
          "as": "grade",
          "cond": {
            "$and": [
              { "$eq": ["$$grade.grade", "A"] },
              { "$eq": ["$$grade.score", 11] },
              { "$eq": ["$$grade.date", ISODate("2014-08-11T00:00:00Z")] }
            ]
          }
        }
      },
      "_id": 0
    }
  }
])

8.db.allRestaurants.aggregate([
  {
    "$match": {
      "grades.1.grade": "A",
      "grades.1.score": 9,
      "grades.1.date": ISODate("2014-08-11T00:00:00Z")
    }
  },
  {
    "$project": {
      "restaurant_id": 1,
      "name": 1,
      "grades": {
        "$filter": {
          "input": "$grades",
          "as": "grade",
          "cond": {
            "$and": [
              { "$eq": ["$$grade.grade", "A"] },
              { "$eq": ["$$grade.score", 9] },
              { "$eq": ["$$grade.date", ISODate("2014-08-11T00:00:00Z")] }
            ]
          }
        }
      },
      "_id": 0
    }
  }
])


9.db.allRestaurants.aggregate([
  {
    "$match": {
      "address.coord.1": { "$gt": 42, "$lte": 52 }
    }
  },
  {
    "$project": {
      "restaurant_id": 1,
      "name": 1,
      "address": 1,
      "geographical_location": "$address.coord",
      "_id": 0
    }
  }
])

10.db.allRestaurants.aggregate([
  {
    "$match": {
      "address.coord.1": { "$gt": 42, "$lte": 52 }
    }
  },
  {
    "$project": {
      "restaurant_id": 1,
      "name": 1,
      "address": 1,
      "geographical_location": "$address.coord",
      "_id": 0
    }
  },
  {
    "$sort": {
      "name": 1
    }
  }
])

11.db.allRestaurants.aggregate([
  {
    "$match": {
      "address.coord.1": { "$gt": 42, "$lte": 52 }
    }
  },
  {
    "$project": {
      "restaurant_id": 1,
      "name": 1,
      "address": 1,
      "geographical_location": "$address.coord",
      "_id": 0
    }
  },
  {
    "$sort": {
      "name": -1
    }
  }
])

12. db.allRestaurants.aggregate([
  {
    "$match": {
      "address.coord.1": { "$gt": 42, "$lte": 52 }
    }
  },
  {
    "$project": {
      "restaurant_id": 1,
      "name": 1,
      "borough": 1,
      "cuisine": 1,
      "address": 1,
      "geographical_location": "$address.coord",
      "_id": 0
    }
  },
  {
    "$sort": {
      "cuisine": 1,
      "borough": -1
    }
  }
])

13.db.allRestaurants.aggregate([
  {
    "$match": {
      "address.street": {
        "$exists": true
      }
    }
  },
  {
    "$group": {
      "_id": null,
      "count": {
        "$sum": 1
      }
    }
  }
])








