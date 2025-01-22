
const express=require("express")
const app=express()
app.use(express.json())
const mongoose=require("mongoose")
const {v4:uuidv4}=require("uuid")

const port=8000


const mongurl="mongodb://localhost:27017/stud"
mongoose
  .connect(mongurl)
  .then(()=>{
    console.log("Db connected")
    app.listen(port,()=>{
        console.log("My server is running")
    })
  })

  const expenseSchema=new mongoose.Schema({
    id:{type:String ,required:true,unique:true},
    title:{type:String,required:true},
    amount:{type:Number,required:true},
});


const expenseModel=mongoose.model("expense-tracker",expenseSchema);//collection name,schema

app.post("/api/expense",async(req,res)=>{
  const data=await expenseModel.find({});
  res.json(data)})

  app.get("/api/expense/:title", async (req, res) => {
    const { title } = req.params;
    const expense = await expenseModel.findOne({ title: title });
  res.json(expense)})

  app.delete("/api/expense/:title", async (req, res) => {
    const { title } = req.params;
    const expense = await expenseModel.deleteOne({ title: title });
  res.json(expense)})



app.put("/api/expense/:id ", async (req, res) => {
  const { id } = req.params;
  const{title,amount}=req.body;
  const updateExpense = await expenseModel.findOneAndUpdate(
    { id:id
    },
    { title: title ,
      amount:amount,
    });
res.status(200).json(updateExpense);
})
     

  

app.post("/api/expense",async(req,res)=>{
    const{title,amount}=req.body;
    const newExpense=new expenseModel({
        id:uuidv4(),
        title:title,
        amount:amount,
     });
     const savedExpense=await newExpense.save();
     res.status(200).json(savedExpense);
});
app.get("expense_trackers",(req,res)=>{
      res.json(expense_trackers)
    })

