const g_usersssss = [ {id:1, name: 'Root'}, {id:2, name: 'arnaud'} ];

function delete_user( req, res )
{
	const id =  parseInt( req.params.id );

	if ( id <= 0)
	{
		res.status( StatusCodes.BAD_REQUEST );
		res.send( "Bad id given")
		return;
	}

	if ( id == 1)
	{
		res.status( StatusCodes.FORBIDDEN ); // Forbidden
		res.send( "Can't delete root user")
		return;		
	}

	const idx =  g_usersssss.findIndex( user =>  user.id == id )
	if ( idx < 0 )
	{
		res.status( StatusCodes.NOT_FOUND );
		res.send( "No such user")
		return;
	}

	g_usersssss.splice( idx, 1 )
	res.send(  JSON.stringify( {}) );   
}
function list_users( req, res) 
{
	res.send(  JSON.stringify( g_usersssss) );   
}

function create_user( req, res )
{
	const name = req.body.name;

	if ( !name)
	{
		res.status( StatusCodes.BAD_REQUEST );
		res.send( "Missing name in request")
		return;
	}


	// Find max id 
	let max_id = 0;
	g_usersssss.forEach(
		item => { max_id = Math.max( max_id, item.id) }
	)

	const new_id = max_id + 1;
	const new_user = { id: new_id , name: name};
	g_usersssss.push( new_user  );
	
	res.send(  JSON.stringify( new_user) );   
}

module.exports = {delete_user, list_users, create_user}