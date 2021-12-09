import express from "express";
import cors from "cors";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
// EXPRESS
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// SUPABASE
import pkg from "@supabase/supabase-js";
const { createClient } = pkg;
const supabaseUrl = "https://twphegmcopuxhufqbpfg.supabase.co";
const supabaseKey =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDc0NjI5NSwiZXhwIjoxOTUwMzIyMjk1fQ.uUoHk5B21XcyCpeJt_my-DunpgVaB0UVn3DqFXz7o1I";
const supabase = createClient(supabaseUrl, supabaseKey);

const port = 3000;
// const port = process.env.PORT || 'http://localhost:3000';
app.listen(port, (error) => {
	console.log(port)
	if(error){
	console.log(error)
	}else{
	console.log(`Server running on port ${port}`);
	}
});

//SELECT TASKS
// console.log(supabase)
app.get("/tasks", async (req, res) => {
	let { data, error } = await supabase.from("projects").select("*");
	res.json(data);
	console.log(data, error);
});

//INSERT TASKS
app.post("/tasks", async (req, res) => {
	let { data, error } = await supabase.from("projects").insert(req.body);
	// console.log(data);
	// console.log(req.body);
});

//DELETE TASKS
app.delete("/tasks", async (req, res) => {
	const { data, error } = await supabase
		.from("projects")
		.delete()
		.match({ id: req.body.id});
	// console.log(req.body.id)
	// console.log(data, error)
});

//INSERT USERDATA
app.post("/userdata", async (req, res) => {
	let { data, error } = await supabase.from("userdata").insert(req.body);
	// console.log(data);
	// console.log(req.body)
});

//SELECT USERDATA
app.get("/userdata", async (req, res) => {
	let { data, error } = await supabase.from("userdata").select("*");
	res.json(data);
	// console.log(userdata)
});

//DELETE USERDATA
app.delete("/userdata", async (req, res) => {
	let { data, error } = await supabase
		.from("userdata")
		.delete()
		.match({ id: req.body.id });
	// console.log(data);
	// console.log(req.body.id);
});

//UPLOAD USERDATA
app.put("/userdata", async (req, res) => {
	const { data, error } = await supabase
		.from("userdata")
		.update({
			done: req.body.done
		})
		.match({ id: req.body.id });
	console.log(req.body.done);
	console.log(data, error);
});

//LOGIN
app.post("/auth", async (req, res) => {
	let { user, session, error } = await supabase.auth.signUp(request.body);
	console.log(user);
	console.log(session);
});


