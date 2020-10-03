import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGifTrending, fetchSearch } from '../../actions/gifs';
import Gifs from './components/gifs.jsx';

const ListPokemon = () => {
	const card = useSelector(state => state.gifs);
	const dispatch = useDispatch();
	const [hasMore, setHasMore] = useState(true)
	const [start, setStart] = useState(0);
	const [count] = useState(12);
	const [items, setItems] = useState([]);
	const [gif, setGif] = useState('');
	const [itemSearch, setItemSearch] = useState([]);
	const [isSearch, setIsSearch] = useState(false);
	const [startSearch, setStartSearch] = useState(0)

	useEffect(() => {
		dispatch(fetchGifTrending(start, count));
	}, [dispatch])

	useEffect(() => {
		if (card.gifs && card.gifs.data !== 0) {
			const { gifs } = card;
			setStart(start + count);
			setTimeout(() => {
				setItems(items.concat(gifs.data));
			}, 500)
		}
	}, [card.gifs.data]);

	useEffect(() => {
		if (card.results !== undefined) {
			const { results } = card;
			setStartSearch(startSearch + count);
			setTimeout(() => {
				setItemSearch(itemSearch.concat(results.data));
			}, 500)
		}
	}, [card.results.data]);

	const fetchMoreGif = () => {
		if (items.length >= 964 || itemSearch.length >= 100) {
			setHasMore(false);
			return;
		}

		if (isSearch !== false) {
			setTimeout(() => {
				dispatch(fetchSearch(gif, startSearch, count))
			}, 1500)
		} else {
			setTimeout(() => {
				dispatch(fetchGifTrending(start, count))
			}, 1500)
		}
	};

	const handleSearchGif = () => {
		setItemSearch([])
		setIsSearch(true)
		const offset = 0
		dispatch(fetchSearch(gif, offset, count))
	}
	

	return (
		<div id="container" className="container">
			<div className="search-box">
				<img className="giphy-logo" src="/assets/images/giphy.svg" alt="giphy-logo" />
				<div>
					<input type="text" placeholder="search gifs" onChange={(event) => {setGif(event.target.value)}} />
					<button onClick={handleSearchGif}>Search</button>
				</div>
			</div>
			<div className="row">
				{
					items !== undefined && items.length > 1 ?
						<Gifs itemSearch={itemSearch} items={items} hasMore={hasMore} isSearch={isSearch} fetchMoreGif={fetchMoreGif} />
						: ''
				}
			</div>
		</div>
	)

}

export default ListPokemon;
