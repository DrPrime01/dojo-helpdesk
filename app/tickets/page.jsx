import { Suspense } from "react";
import Link from "next/link";
import TicketList from "./TicketList";
import Loading from "../loading";

export default function Tickets() {
	return (
		<main>
			<nav>
				<div>
					<h2>Tickets</h2>
					<p>
						<small>Currently new tickets</small>
					</p>
				</div>
			</nav>
			<Suspense fallback={<Loading />}>
				<TicketList />
			</Suspense>
			<div className="text-center mt-10">
				<Link
					href="/tickets/create"
					className="bg-primary text-white font-medium text-sm px-3 py-2 rounded-lg"
				>
					Create New Ticket
				</Link>
			</div>
		</main>
	);
}
