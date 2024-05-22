import React,{useState} from 'react'

const App = () => {
  const [search,setSearch] = useState('');
  const [data,setData] = useState([]);
  const submitHandler = e =>{
    e.preventDefault();
    fetch(`http://www.omdbapi.com/?s=${search}&apikey=263d22d8`).then(
      response => response.json()
    ).then(value => {
      setData(value.Search);
    })
  }
  /*when we fetch the images from API if that images should be downloaded then we do mention the below Object url function for dowloading 
  here the main functionality it is we are assigned object url with link of "a" tag 
  NOTE:without using href in the "a" tag the page will not loaded when do any download any cards
  But when we wants to dowmlaoad any image which taken from local storage we can directly dowload*/
  const download = url => {
    fetch(url).then(response => {
        response.arrayBuffer().then(function(buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png");
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  //below to create the cards we can use cards code available in the bootstrap.
  //to make cards mention in the row we do get the className as row from the bootstrap
  //to get the print the cards 3 count in the row we can use className as col-md-4
  return (
    <div>
        <center>
          <h1>Search Your Favorite Movie</h1>
          <form onSubmit={submitHandler}>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}/><br /><br />
            <input type="submit" value="Search" />
          </form>
          <div className="row" >
          {data.length>=1?data.map(movie=>
          <div className="col-md-4" key={movie.imdbID}>
            <div className="card" style={{"width": "18rem"}}>
              <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
              <div className="card-body">
                <h4 className="card-title">{movie.Title}</h4>
                <a className="btn btn-primary" onClick={()=>download(movie.Poster)}>Download Poster</a>
              </div>
            </div>
          </div>
            ):null}
            </div>
        </center>
    </div>
  )
}

export default App
