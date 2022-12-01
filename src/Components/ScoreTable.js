import "./ScoreTable.css"

function ScoreTable(props) {
    const { diades, puntuacions } = props;

	const groupLength = (group) => {
		let length = 0;
		taula_puntuacions.map((castell, i) => {
			if (castell["Grup"] === group) length += 1;
		});
		return length;
	};

	const subGroupLength = (group, subgroup) => {
		let length = 0;
		taula_puntuacions.map((castell, i) => {
			if (castell["Grup"] === group && castell["Subgrup"] === subgroup) length += 1;
		});
		return length;
	};

	const taula_puntuacions = [...Object.values(puntuacions)];

	let lastGroup = -1;
	let lastSub = -1;
	return (
        <>
			<div id="score">
            <h1>Taula de puntuacions</h1>
			<h2>Aquesta taula serà actualitzada contínuament per tal de garantir el major consens possible.<br/>Per col·laborar-hi afegeix un comentari en aquest <a href="https://docs.google.com/spreadsheets/d/105YLYfRNPUvhx6G8QUkZykGPHPTpzCk6WO5zBGV2LcA#gid=1401475200" target="_blank">Excel</a></h2>
			<div className="justify_center">
			<table>
				<thead>
					<tr>
						<th>Grup</th>
						<th>Subgrup</th>
						<th>Castell</th>
						<th>Carregat</th>
						<th>Descarregat</th>
					</tr>
				</thead>
				<tbody>
			{
				taula_puntuacions.map((castell, i) => {
					const group = lastGroup === castell["Grup"] ? <></> : <td rowSpan={groupLength(castell["Grup"])}>Grup {castell["Grup"]}</td>;
					const sub = lastSub === castell["Subgrup"] && lastGroup === castell["Grup"] ? <></> : <td rowSpan={subGroupLength(castell["Grup"], castell["Subgrup"])}>sub {castell["Subgrup"]}</td>;
					lastGroup = castell["Grup"];
					lastSub = castell["Subgrup"];
					return (
						<>
							<tr className={"grup"+lastGroup}>
								{group}
								{sub}
								<td>{Object.keys(puntuacions)[i]}</td>
								<td>{castell["Carregat"]}</td>
								<td>{castell["Descarregat"]}</td>
							</tr>
						</>
					);
				})
			}
				</tbody>
			</table>
			</div>
			</div>
        </>
    );
}

export default ScoreTable;
