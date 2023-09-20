use policy_management_system;

DROP TABLE IF EXISTS `solutions`;
create table `solutions` (
	solutionId int NOT NULL auto_increment primary key,
    solution_name varchar(100),
    solution_description varchar(250),
    solution_documents_path varchar(100),
    solution_codezip_path varchar(100),
    solution_category varchar(100),
    solution_tags varchar(100),
    solution_snippet varchar(10000),
    solution_link varchar(100)
);

/* Example add to table*/;

insert into solutions(solution_name, solution_description, solution_documents_path, solution_codezip_path, solution_category, solution_tags, solution_snippet, solution_link) values (
	"UiPath Bot", 
    "Bot that auto-responds to basic user queries sent to the MiWay email box", 
    "uploads/",
    "uploads/",
    "Automation",
    "Bots",
    "import '../styles/App.css'; 
    function Solution(props) {
		return(
			<div class=&quot;card&quot; >
				<img src=&quot;...&quot; alt=&quot;...&quot;/>
				<div class=&quot;card-body&quot;>
					<h5 class=&quot;card-title&quot;>{ props.title }</h5>
					<p class=&quot;card-text&quot;>{ props.text }</p>
					<a href=&quot;#&quot; class=&quot;btn btn-primary&quot;>See Solution</a>
				</div>
			</div>
		);
	}
	export default Solution;",
    "");
