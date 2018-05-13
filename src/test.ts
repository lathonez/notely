// our apps starting point
import './index.ts'

// include angular mocks
import 'angular-mocks'

// grab all spec files and include them in the page tests are run in
requireAll((<any>require).context('./', true, /spec.ts$/))
function requireAll(r: any): any {
    r.keys().forEach(r)
}
