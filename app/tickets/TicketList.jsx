import Link from "next/link";

async function getTickets() {
	// imitate a delay
	await new Promise((resolve) => setTimeout(resolve, 3000));
	const res = await fetch("http://localhost:4000/tickets", {
		next: {
			revalidate: 0,
			// revalidate: 30, // to revalidate the cache data for 30 secs. The same data will be returned if you revisit the page after 30 seconds even if the data has been updated. If you don't want to revalidate, set it to 0
		},
	});

	return res?.json();
}

export default async function TicketList() {
	const tickets = await getTickets();
	return (
		<>
			{tickets?.map((ticket) => (
				<div key={ticket?.id} className="card my-5">
					<Link href={`/tickets/${ticket?.id}`}>
						<h3>{ticket?.title}</h3>
						<p>{ticket?.body?.slice(0, 300)}...</p>
						<div className={`pill ${ticket?.priority}`}>
							{ticket?.priority} priority
						</div>
					</Link>
				</div>
			))}
			{tickets?.length === 0 && (
				<p className="text-center">There are no open tickets, yay!</p>
			)}
		</>
	);
}
