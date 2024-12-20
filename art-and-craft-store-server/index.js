const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const jwt = require('jsonwebtoken');
let cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.iam7h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


//Own MiddleWare
const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send({ message: "Unauthorize Access" })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (error, decoded) => {
        if (error) {
            return res.status(401).send({ message: "Unauthorize Access" });
        }

        res.user = decoded;
        next()

    })
}

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const database = client.db("CarftAndArtDB");
        const allArtAndCraft = database.collection("artAndCraft")
        const sixCraftItems = database.collection("mainSixCategories");
        const bookings = database.collection("bookings");


        // Auth API
        app.post('/jwt', async (req, res) => {
            const userEmail = req.body;
            const token = jwt.sign(userEmail, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                maxAge: 360000
            });
            res.send({ success: true });
        })


        app.get('/six-craft-items', async (req, res) => {
            const query = sixCraftItems.find();
            const result = await query.toArray();
            res.send(result)
        })


        app.get('/all-art-and-craft-items', async (req, res) => {
            try {

                const page = parseInt(req.query?.page) || 0; // Default to 0 if undefined or invalid
                const size = parseInt(req.query?.size) || 10; // Default to 10 if undefined or invalid
                const filter = req.query?.filter;
                const sort = req.query?.sort;
                const search = req.query?.search;

                let query = {};
                if (req.query?.email) {
                    query.email = req.query.email;
                }

                if (req.query?.sub_category) {
                    query.sub_category = req.query.sub_category;
                }

                if (filter) {
                    query.subcategory_Name = filter;
                }

                let options = {};
                if (sort) {
                    options = { sort: { price: sort === "asc" ? 1 : -1 } }
                }

                if (search) {
                    query.item_name = { $regex: search, $options: "i" }
                }

                const cursor = allArtAndCraft.find(query, options).skip(page * size).limit(size);
                const result = await cursor.toArray();
                res.send(result);

            } catch (error) {
                console.error("Error fetching items:", error);
                res.status(500).send({ error: "Failed to fetch items" });
            }
        });



        //estamaticCount
        app.get('/items-count', async (req, res) => {
            const filterText = req.query?.filter;
            const searchText = req.query?.search;

            let query = {};  // filter or query

            if (filterText) {
                query = { subcategory_Name: filterText }
            }

            if (searchText) {
                query.item_name = { $regex: searchText, $options: "i" }
            }

            const result = await allArtAndCraft.countDocuments(query);
            res.send({ result })
        })


        app.get('/all-art-and-craft-items/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await allArtAndCraft.findOne(query);
            res.send(result)
        })


        app.get('/orders', verifyToken, async (req, res) => {

            if (req.query.email !== res.user.email) {
                return res.status(403).send({ message: "Forbidden" })
            }

            let query = {};
            if (req.query?.email) {
                query = { email: req.query?.email };
            }

            const cursor = bookings.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })

        app.get('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: id };
            const result = await bookings.findOne(query);
            console.log("result:", result)
            res.send(result)
        })


        app.post('/all-art-and-craft-items', async (req, res) => {
            const item = req.body;
            const result = await allArtAndCraft.insertOne(item);
            res.send(result)
        })

        app.post('/orders', async (req, res) => {
            const item = req.body;
            const result = await bookings.insertOne(item);
            res.send(result)
        })

        app.put('/all-art-and-craft-items/:id', async (req, res) => {
            const id = req.params.id;
            const item = req.body;
            console.log(id, item)
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    image: item?.image,
                    item_name: item?.item_name,
                    subcategory_Name: item?.subcategory_Name,
                    short_description: item?.short_description,
                    price: item?.price,
                    rating: item?.rating,
                    customization: item?.customization,
                    processing_time: item?.processing_time,
                    stockStatus: item?.stockStatus
                }
            }

            const result = await allArtAndCraft.updateOne(filter, updateDoc, options);
            res.send(result)
        })

        app.patch('/all-art-and-craft-items/:id', async (req, res) => {
            const id = req.params.id
            const updateInfo = req.body;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    order: updateInfo?.order
                }
            }
            const result = await allArtAndCraft.updateOne(filter, updateDoc);
            res.send(result)
        })


        app.delete('/all-art-and-craft-items/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await allArtAndCraft.deleteOne(query);
            res.send(result)
        })

        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: id }
            const result = await bookings.deleteOne(query);
            res.send(result)
        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', async (req, res) => {
    res.send("Carft and Art DB")
})

app.listen(port, () => {
    console.log(`Open this Port by ${port}`)
})
