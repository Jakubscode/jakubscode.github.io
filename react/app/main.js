console.log('Hello World');
var ajax = new Ajax();

String.prototype.capitalize = function () {
    //be careful
    return this.charAt(0).toUpperCase() + this.slice(1);
};

/*var Link = React.createClass({
    render: function() {
        return (
        <li onClick={this.props.e.bind(null,this.props.children)}>
            <a>
                {this.props.children}
            </a>
        </li>
        )
    }
})*/
/*var Nav = React.createClass({
    
    render: function() {
        var cards = ['Places', 'People', 'Images'];
        var changeContent = function(title) {
            document.querySelector('title').innerHTML = title;
        };
        var links = cards.map(function(linkName) {
            return (
                <Link e={changeContent} key={linkName}>
                  {linkName}
                </Link>
            );
        });
        return (
            <nav  className="mainNav">
                <ul>
                    {links}
                </ul>
            </nav>
        )
    }
}) */
var SearchBar = React.createClass({
    displayName: "SearchBar",

    render: function () {
        var options = this.props.cats.map(function (category) {
            return React.createElement(
                "option",
                { value: category, key: category },
                category
            );
        });
        return React.createElement(
            "div",
            { className: "searchBar" },
            React.createElement(
                "label",
                { htmlFor: "searchInput" },
                "Search"
            ),
            React.createElement("input", { id: "searchInput", type: "text", placeholder: "search something", onChange: this.props.includeFilter }),
            React.createElement(
                "label",
                { htmlFor: "category" },
                "category: "
            ),
            React.createElement(
                "select",
                { id: "category", name: "select", onChange: this.props.handleCategoryChange },
                options
            ),
            React.createElement(
                "label",
                { htmlFor: "limit" },
                "Limit: "
            ),
            React.createElement("input", { id: "limit", type: "number", value: this.props.limit, onChange: this.props.handleLimitChange })
        );
    }
});
var Person = React.createClass({
    displayName: "Person",

    getInitialState: function () {
        return { showMore: false };
    },
    showMoreToogle: function () {
        this.setState({ showMore: !this.state.showMore });
    },
    render: function () {
        var data = this.props.children.user;
        var filter = this.props.filter;
        var name = data.name.first.capitalize() + " " + data.name.last.capitalize();
        var getNameHighlight = function (name, filter) {
            var start = name.indexOf(filter);
            var end = start + filter.length;
            //console.log(name);
            return React.createElement(
                "span",
                null,
                name.substr(0, start),
                React.createElement(
                    "b",
                    null,
                    filter
                ),
                name.substr(end)
            );
        };
        var nameHighlighted = filter != undefined || filter != '' ? getNameHighlight(name, filter) : name;
        var moreInfo = !this.state.showMore ? null : React.createElement(
            "ul",
            null,
            React.createElement(
                "li",
                null,
                React.createElement("img", { src: data.picture.medium })
            ),
            React.createElement(
                "li",
                null,
                "Street: " + data.location.street
            ),
            React.createElement(
                "li",
                null,
                "City:" + data.location.city.capitalize()
            )
        );
        return React.createElement(
            "li",
            { className: "person" },
            nameHighlighted,
            React.createElement(
                "button",
                { onClick: this.showMoreToogle },
                "Show More"
            ),
            moreInfo
        );
    }
});
var Place = React.createClass({
    displayName: "Place",

    showMap: function () {
        window.open("http://maps.google.com?z=12&t=h&q=" + this.props.children.lat + "," + this.props.children.long);
    },
    render: function () {
        var place = this.props.children;
        var filter = this.props.filter;
        var name = place.name;
        var nameLowerCase = place.name.toLowerCase();
        //console.log("NameLowerCase",nameLowerCase,"place.name",place.name,"var name", name);
        var getNameHighlight = function (name, filter) {
            var start = nameLowerCase.indexOf(filter);
            console.log("nameLowerCase", "+" + nameLowerCase + "+");
            console.log("name", name);
            var end = start + filter.length;
            console.log('filter', filter, filter.length, "name Length", name.length);
            console.log("start", start, "end", end);
            console.log(name.substr(0, start) + name.substr(start, end) + name.substr(end));
            return React.createElement(
                "span",
                null,
                name.substr(0, start),
                React.createElement(
                    "b",
                    null,
                    name.substr(start, filter.length)
                ),
                name.substr(end)
            );
        };
        var nameHighlighted = filter != undefined || filter != '' ? getNameHighlight(name, filter) : name;

        return React.createElement(
            "li",
            { className: "place" },
            React.createElement(
                "p",
                null,
                nameHighlighted
            ),
            React.createElement(
                "button",
                { onClick: this.showMap },
                "Pokaż na mapie"
            )
        );
    }
});
var Results = React.createClass({
    displayName: "Results",

    render: function () {
        var filter = this.props.filter.toLowerCase();
        var defaultResult = React.createElement(
            "p",
            null,
            "No result found :(."
        );
        var data = this.props.data;
        var limit = this.props.limit;
        var getPlaces = function () {
            var places = [];
            var i = 0;
            data.locations.forEach(function (place) {
                var name = place.name.toLowerCase();
                if ((filter != undefined || filter != "") && name.indexOf(filter) > -1) places.push(React.createElement(
                    Place,
                    { key: i++, filter: filter },
                    place
                ));
            });
            //var limitedPeople
            return places.length > 0 ? places.slice(0, limit) : defaultResult;
            //console.log(people.length, people);
        };
        var getPeople = function () {
            var people = [];
            var i = 0;
            data.results.forEach(function (person) {
                var name = person.user.name.first.capitalize() + " " + person.user.name.last.capitalize();
                if ((filter != undefined || filter != "") && name.indexOf(filter) > -1) people.push(React.createElement(
                    Person,
                    { key: i++, filter: filter },
                    person
                ));
            });
            //var limitedPeople
            return people.length > 0 ? people.slice(0, limit) : defaultResult;
        };
        var result = function (category) {
            var result;
            console.log(category);
            switch (category) {
                case 'places':
                    result = React.createElement(
                        "ol",
                        { className: "places" },
                        React.createElement(
                            "strong",
                            null,
                            'Data base on http://www.forgotten.pl'
                        ),
                        getPlaces()
                    );
                    break;
                case 'people':
                    result = React.createElement(
                        "ol",
                        null,
                        React.createElement(
                            "strong",
                            null,
                            'Data base on http://randomuser.me API'
                        ),
                        getPeople()
                    );break;
                case 'images':
                    result = React.createElement(
                        "span",
                        { style: { color: 'green' } },
                        "images"
                    );break;
                default:
                    result = defaultResult;
            }
            return result;
        };
        return React.createElement(
            "div",
            { className: "results" },
            result(this.props.cat)
        );
    }
});
var App = React.createClass({
    displayName: "App",

    loadDataFromServer: function (cat) {
        /*ajax.get('/api/' + cat, null, function (data) {
            this.setState({ data: data });
        }.bind(this));*/
        ajax.get('locations-objects.json' , null, function (data) {
            this.setState({ data: data });
        }.bind(this));
    },
    getInitialState: function () {
        return { data: { results: [] }, category: this.props.cats[0], filter: "", limit: 100 };
    },
    componentDidMount: function () {
        this.loadDataFromServer(this.state.category);
    },
    handleCategoryChange: function (e) {
        this.setState({ category: e.target.value });
        document.querySelector('title').innerHTML = e.target.value;
        this.loadDataFromServer(e.target.value);
    },
    handleLimitChange: function (e) {
        this.setState({ limit: e.target.value });
    },
    includeFilter: function (e) {
        this.setState({ filter: e.target.value });
        console.log("FIlter: ", this.state.filter, e.target.value);
    },
    render: function () {
        return React.createElement(
            "div",
            { className: "app" },
            React.createElement(SearchBar, { cats: this.props.cats, handleCategoryChange: this.handleCategoryChange, handleLimitChange: this.handleLimitChange, limit: this.state.limit, includeFilter: this.includeFilter }),
            React.createElement(Results, { cat: this.state.category, data: this.state.data, filter: this.state.filter, limit: this.state.limit })
        );
    }
});
var categories = ['people', 'places', 'images'];
ReactDOM.render(React.createElement(App, { cats: categories }), document.querySelector('#app'));
//TODO Jak mam otwartego gościa i zmieniam input wyszukiwania to zawsze rowija się gość o numerze jak ten pierwszy gość