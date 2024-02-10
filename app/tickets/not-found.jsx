import Link from "next/link";

// This NotFound page is specific to this ticket route and will override the public NotFound page

export default function NotFound() {
	return (
		<main className="text-center">
			<h2 className="text-3xl">We hit a brick wall</h2>
			<p>This ticket does not exist</p>
			<p>
				Go back to the <Link href="/">Dashboard</Link>
			</p>
		</main>
	);
}
