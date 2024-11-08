export default function CustomEvent({ musicEvent, showingMonthly }: { musicEvent: any, showingMonthly: boolean }) {
	return (
		<div onClick={() => window.open(musicEvent.link, '_blank')} style={{ fontWeight: 'bold', color: 'lightgray' }} className="custom-event">
			{showingMonthly ?
				<p className="weekly">{`${musicEvent.Artist.toLowerCase()} @ ${musicEvent.Venue.toLowerCase()}`}</p> :
				<>
					<p className="weekly weekly-artist">{musicEvent.Artist.toLowerCase()}</p>
					<p className="weekly">{musicEvent.Time.toLowerCase()}</p>
					<p className="weekly">{musicEvent.Venue.toLowerCase()}</p>
					<p className="weekly">{musicEvent.Town.toLowerCase()}</p>
				</>}
		</div>
	)
};