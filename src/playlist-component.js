var Playlist = Parse.Object.extend('Playlist'),
	PlaylistItem = Parse.Object.extend('PlaylistItem');

var PlaylistItemComponent = React.createClass({
	propTypes: {
		playlistItem: React.PropTypes.object.isRequired
	},
	render: function () {
		var playlistItem = this.props.playlistItem;
		return (
			<li>
				<span>{ playlistItem.get('videoId') }</span>
				<span>{ playlistItem.get('createdAt').toString() }</span>
				<span>{ playlistItem.get('updatedAt').toString() }</span>
				<span>{ playlistItem.get('likes') }</span>
			</li>
		);
	}
});

var PlaylistComponent = React.createClass({
	propTypes: {
		playlistId: React.PropTypes.string.isRequired
	},
	getInitialState: function () {
		return {
			playlistItems: null
		};
	},
	fetchPlaylistItems: function () {
		var playlistQuery = new Parse.Query(Playlist);
		playlistQuery.get(this.props.playlistId, {
			success: function (playlist) {
				var query = new Parse.Query(PlaylistItem);
				query.equalTo('Playlist', playlist);
				query.find({
					success: function (playlistItems) {
						console.log(playlistItems)
						// The object was retrieved successfully.
						this.setState({
							playlistItems: playlistItems
						});
					}.bind(this),
					error: function (object, error) {
						// The object was not retrieved successfully.
						// error is a Parse.Error with an error code and message.
						console.error('Error fetching playlist items.', error);
					}
				});
			}.bind(this),
			error: function (object, error) {
				console.error('Error fetching playlist object.', error);
			}
		});
	},
	componentWillMount: function () {
		this.fetchPlaylistItems();
	},
	render: function () {
		var playlistItems = this.state.playlistItems;
		if (!playlistItems) {
			return <h3>Fetching playlist...</h3>;
		}
		return (
			<ul>
				{ playlistItems.map(function (playlistItem) {
					return <PlaylistItemComponent key={ playlistItem.id } playlistItem={ playlistItem } />
				}) }
			</ul>
		);
	}
});

window.PlaylistComponent = PlaylistComponent;