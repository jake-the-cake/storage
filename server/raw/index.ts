import Express from 'express'
import Mongoose from 'mongoose'
import cors from 'cors'

const APP = Express()
const PORT = process.env.PORT || 4200

Mongoose
  .connect(
    'mongodb://localhost:27017/server'
  )
  .then(() => {
    console.log( 'db' )
  })
  .catch(( error ) => {
    console.log( error.message )
  })

const ItemSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
},
{
  timestamps: true
})

const ItemModel = Mongoose.model( 'Items', ItemSchema )

APP.use( cors() )
APP.use( Express.json() )
APP.use( Express.urlencoded({ extended: true }))

APP.get( '/items', async ( req, res ) => {
  const data = await ItemModel.find()
  res.status( 200 ).json( data )
})

APP.post( '/add', ( req, res ) => {
  console.log('this is hit')
  const item = new ItemModel({
    name: req.body.name
  })
  item.save()
  res.status( 201 ).json( item )
})

APP.listen(
  PORT, () => {
    console.log( `Server live on port ${ PORT }.` )
  }
)