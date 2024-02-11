import { notFound } from "next/navigation";

// static rendering

export const dynamicParams = true; // if a request is made for an id that doesn't exist in the statically generated page, Next returns 404 if dynamicParams is false. Default is true. If true is set, Next generates a new page with the id if data exists for it

export async function generateStaticParams() {
	const res = await fetch(`http://localhost:4000/tickets`);
	const tickets = await res?.json();

	return tickets.map((ticket) => ({ id: ticket?.id }));
}

async function getTicket(id) {
	await new Promise((resolve) => setTimeout(resolve, 3000));
	const res = await fetch(`http://localhost:4000/tickets/${id}`, {
		next: {
			revalidate: 60,
		},
	});

	if (!res?.ok) {
		notFound();
	}

	return res?.json();
}

export default async function TicketDetails({ params }) {
	const id = params?.id;
	const ticket = await getTicket(id);
	return (
		<main>
			<nav>
				<h2>Ticket Details</h2>
			</nav>
			<div className="card">
				<h3>{ticket?.title}</h3>
				<small>Created by {ticket?.user_email}</small>
				<p>{ticket?.body}</p>
				<div className={`pill ${ticket?.priority}`}>
					{ticket?.priority} priority
				</div>
			</div>
		</main>
	);
}
