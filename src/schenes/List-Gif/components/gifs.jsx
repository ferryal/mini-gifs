import React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

const Gifs = (props) => {
    const { items, itemSearch, isSearch, hasMore, fetchMoreGif } = props;
    return (
        <React.Fragment>
			{
				items !== undefined && items.length > 1 ?
					<InfiniteScroll
						dataLength={isSearch !== true ? items.length : itemSearch.length }
						next={fetchMoreGif}
						hasMore={hasMore}
						loader={<img src="/assets/images/spinner.gif" alt="" style={{ width: '20%'}} />}
						height={600}
						style={{
							width: 'auto',
							display: 'flex',
							maxWidth: '80%',
							margin: '2% auto',
							flexWrap: 'wrap',
							alignItems: 'flex-start',
							textAlign: 'center',
						}}
						endMessage={
							<p style={{ textAlign: "center" }}>
								<b>Yay! You have seen it all</b>
							</p>
						}
					>
					{ isSearch !== true ?
						items !== undefined && items.length > 2 ?
							items.map((data, index) => {
								return (
									<section className="column m-5" key={index + 1}>
										<img src={data.images.preview_gif.url} alt="gif" />
									</section>
								);
							}) : ''
						: itemSearch !== undefined && itemSearch.length > 1 ?
							itemSearch.map((data, index) => {
								return (
									<section className="column m-5" key={index + 1}>
										<img src={data.images.downsized.url} alt="gif" />
									</section>
								);
							}) : ''
					}
				</InfiniteScroll> : ''
			}
		</React.Fragment>
    )
}

export default Gifs