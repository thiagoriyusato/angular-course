# Guia de Referência para Regras SonarSource TypeScript (para GitHub Copilot)

Este documento resume e referencia as regras de TypeScript publicadas pelo SonarSource para uso com SonarQube/SonarCloud. Ele foi pensado como um material de apoio para instruções do GitHub Copilot: como interpretar cada regra, sugerir correções e manter código limpo, seguro e testável em projetos TypeScript (incluindo Angular, React, Node.js, etc.).

Importante: não reproduzimos o conteúdo protegido do site; em vez disso, organizamos os identificadores (RSPEC), links oficiais, categorias, severidades e heurísticas de correção. Para detalhes completos, consulte os links oficiais.

Site oficial: https://rules.sonarsource.com/typescript/


## Como usar com Copilot

- Contextualize: informe ao Copilot a regra (ex.: "RSPEC-6959") e o tipo (Bug, Vulnerability, Security Hotspot, Code Smell) e peça uma sugestão de correção no seu arquivo/trecho.
- Peça exemplos: solicite exemplos de código seguro/limpo aplicando a regra em seu contexto (Angular service, React component, Node API, etc.).
- Autocorreção: combine a regra com linters (ESLint) e com testes unitários (Jest/Jasmine) para validar a mudança.
- Prompts úteis:
  - "Explique o que a regra RSPEC-XXXX pretende evitar e proponha uma refatoração mínima para este trecho: …"
  - "Gere um quick-fix para RSPEC-XXXX em um componente Angular (TypeScript estrito)."
  - "Escreva um teste que capture a violação de RSPEC-XXXX e a correção proposta."


## Taxonomia das regras (o que significa cada campo)

- Tipo:
  - Bug: comportamento incorreto do programa.
  - Vulnerability: risco de segurança confirmado.
  - Security Hotspot: código sensível que requer revisão manual.
  - Code Smell: problema de manutenção/leitura/robustez.
- Severidade: Blocker, Critical, Major, Minor, Info (priorize de cima para baixo).
- Status: Active, Deprecated, Beta (use ativas por padrão).
- Tags: palavras‑chave (ex.: security, regex, accessibility, angular, react, aws, jest) que ajudam a filtrar por domínio.
- Remediation: estimativa de esforço/"fix cost" e parâmetros de autofix (quando disponível).


## Panorama e links rápidos

- Total de regras (no site): ~427
- Por tipo (links oficiais de filtro):
  - Vulnerability (~30): https://rules.sonarsource.com/typescript/type/Vulnerability/
  - Bug (~72): https://rules.sonarsource.com/typescript/type/Bug/
  - Security Hotspot (~62): https://rules.sonarsource.com/typescript/type/Security%20Hotspot/
  - Code Smell (~263): https://rules.sonarsource.com/typescript/type/Code%20Smell/
- Página "All rules": https://rules.sonarsource.com/typescript/
- Regras com Quick Fix: https://rules.sonarsource.com/typescript/quickfix/
- Outras linguagens (para projetos full‑stack): https://rules.sonarsource.com/


## Diretrizes gerais por tema (heurísticas para o Copilot)

- Tipagem e APIs TS
  - Evite `any`, `void` como tipo de valor e non‑null assertions (`!`) fora de casos justificáveis.
  - Prefira type predicates, type aliases, function types e retorno fluente com `this` quando aplicável.
  - Use `as` para type assertions; evite redundâncias e união/interseção com constituintes duplicados.
- Fluxo de controle e legibilidade
  - Evite nested conditionals excessivos; limite complexidade ciclomática/cognitiva.
  - Garanta que todos os caminhos retornem consistentemente; não use código inalcançável.
  - Use `switch` corretamente (default, breaks) e não aninhe switches desnecessariamente.
- Boas práticas de JS/TS moderno
  - Prefira optional chaining/nullish coalescing; use `Object.hasOwn` em vez de `hasOwnProperty` direto.
  - Prefira spread syntax e template literals; evite `var`, `arguments`, `__proto__`, octal escapes, etc.
  - Remova imports, construtores e casts desnecessários; não modifique protótipos nativos.
- Segurança
  - Evite execuções dinâmicas, injeção em comandos OS/DB/NoSQL/XPath; valide origens e cabeçalhos.
  - Configure corretamente HTTPS/TLS, CSP, HSTS, cookies (Secure/HttpOnly), JWT, criptografia e hashing.
  - Ao lidar com AWS e serviços cloud, ative criptografia, limite permissões e acesso público.
- Regex
  - Evite padrões complexos/lentos/ambiguidades; use `u` quando necessário; valide grupos e quantificadores.
  - Prefira literais quando simples; evite grupos vazios e alternativas vazias ou redundantes.
- Acessibilidade/DOM/React
  - Garanta texto alternativo, rótulos e roles ARIA compatíveis; foco e tabulação corretos.
  - Em React, evite mutar state diretamente, usar APIs legadas e padrões instáveis em props/keys/hooks.
- Testes
  - Não omita asserts; evite testes instáveis/exclusivos; não execute código após `done()`.
  - Nomeie claramente, mantenha granularidade e isole efeitos colaterais.


## Índice navegável de regras (por tipo, com chaves RSPEC)

Abaixo, listamos as regras por tipo com seus identificadores (RSPEC). Cada item aponta para a descrição oficial. Use o link para detalhes completos, exemplos e rationale. Os títulos e textos completos são disponibilizados apenas no site oficial.

Observação: a lista é extensa; priorize as regras do seu domínio (segurança, DOM/React, padrões TS) e consulte as páginas de filtro acima para explorar tudo.

### Bugs (amostra representativa + índice)

Amostra representativa (paráfrases curtas para orientar o Copilot):
- RSPEC-905 — Evitar instruções não vazias que não alteram fluxo nem têm efeito.
- RSPEC-6959 — Forneça valor inicial ao `Array.prototype.reduce`.
- RSPEC-6534 — Evite operações numéricas que perdem precisão.
- RSPEC-4822 — Não capture rejeição de Promise com `try/catch` síncrono.
- RSPEC-3812 — Use parênteses ao negar `in`/`instanceof`.
- RSPEC-3699 — Não use retorno de função `void`.
- RSPEC-3531 — `generator` deve sempre `yield` quando aplicável.
- RSPEC-2871 — Informe um comparador a `Array.sort`/`toSorted` quando necessário.
- RSPEC-2092 — Cookies sem `Secure` são sensíveis (ver Hotspot também).

Índice (com links):
- RSPEC-905: https://rules.sonarsource.com/typescript/RSPEC-905/
- RSPEC-6959: https://rules.sonarsource.com/typescript/RSPEC-6959/
- RSPEC-6958: https://rules.sonarsource.com/typescript/RSPEC-6958/
- RSPEC-6679: https://rules.sonarsource.com/typescript/RSPEC-6679/
- RSPEC-6638: https://rules.sonarsource.com/typescript/RSPEC-6638/
- RSPEC-6523: https://rules.sonarsource.com/typescript/RSPEC-6523/
- RSPEC-6443: https://rules.sonarsource.com/typescript/RSPEC-6443/
- RSPEC-6442: https://rules.sonarsource.com/typescript/RSPEC-6442/
- RSPEC-6440: https://rules.sonarsource.com/typescript/RSPEC-6440/
- RSPEC-6439: https://rules.sonarsource.com/typescript/RSPEC-6439/
- RSPEC-6438: https://rules.sonarsource.com/typescript/RSPEC-6438/
- RSPEC-6435: https://rules.sonarsource.com/typescript/RSPEC-6435/
- RSPEC-6351: https://rules.sonarsource.com/typescript/RSPEC-6351/
- RSPEC-6328: https://rules.sonarsource.com/typescript/RSPEC-6328/
- RSPEC-6324: https://rules.sonarsource.com/typescript/RSPEC-6324/
- RSPEC-6323: https://rules.sonarsource.com/typescript/RSPEC-6323/
- RSPEC-6019: https://rules.sonarsource.com/typescript/RSPEC-6019/
- RSPEC-5973: https://rules.sonarsource.com/typescript/RSPEC-5973/
- RSPEC-5958: https://rules.sonarsource.com/typescript/RSPEC-5958/
- RSPEC-5883: https://rules.sonarsource.com/typescript/RSPEC-5883/
- RSPEC-5876: https://rules.sonarsource.com/typescript/RSPEC-5876/
- RSPEC-5868: https://rules.sonarsource.com/typescript/RSPEC-5868/
- RSPEC-5867: https://rules.sonarsource.com/typescript/RSPEC-5867/
- RSPEC-5863: https://rules.sonarsource.com/typescript/RSPEC-5863/
- RSPEC-5856: https://rules.sonarsource.com/typescript/RSPEC-5856/
- RSPEC-5850: https://rules.sonarsource.com/typescript/RSPEC-5850/
- RSPEC-5842: https://rules.sonarsource.com/typescript/RSPEC-5842/
- RSPEC-5759: https://rules.sonarsource.com/typescript/RSPEC-5759/
- RSPEC-5696: https://rules.sonarsource.com/typescript/RSPEC-5696/
- RSPEC-5659: https://rules.sonarsource.com/typescript/RSPEC-5659/
- RSPEC-5527: https://rules.sonarsource.com/typescript/RSPEC-5527/
- RSPEC-5334: https://rules.sonarsource.com/typescript/RSPEC-5334/
- RSPEC-4830: https://rules.sonarsource.com/typescript/RSPEC-4830/
- RSPEC-4822: https://rules.sonarsource.com/typescript/RSPEC-4822/
- RSPEC-4798: https://rules.sonarsource.com/typescript/RSPEC-4798/
- RSPEC-4634: https://rules.sonarsource.com/typescript/RSPEC-4634/
- RSPEC-4524: https://rules.sonarsource.com/typescript/RSPEC-4524/
- RSPEC-4335: https://rules.sonarsource.com/typescript/RSPEC-4335/
- RSPEC-4275: https://rules.sonarsource.com/typescript/RSPEC-4275/
- RSPEC-4158: https://rules.sonarsource.com/typescript/RSPEC-4158/
- RSPEC-4124: https://rules.sonarsource.com/typescript/RSPEC-4124/
- RSPEC-3984: https://rules.sonarsource.com/typescript/RSPEC-3984/
- RSPEC-3981: https://rules.sonarsource.com/typescript/RSPEC-3981/
- RSPEC-3923: https://rules.sonarsource.com/typescript/RSPEC-3923/
- RSPEC-3854: https://rules.sonarsource.com/typescript/RSPEC-3854/
- RSPEC-3812: https://rules.sonarsource.com/typescript/RSPEC-3812/
- RSPEC-3799: https://rules.sonarsource.com/typescript/RSPEC-3799/
- RSPEC-3786: https://rules.sonarsource.com/typescript/RSPEC-3786/
- RSPEC-3699: https://rules.sonarsource.com/typescript/RSPEC-3699/
- RSPEC-3649: https://rules.sonarsource.com/typescript/RSPEC-3649/
- RSPEC-3616: https://rules.sonarsource.com/typescript/RSPEC-3616/
- RSPEC-3531: https://rules.sonarsource.com/typescript/RSPEC-3531/
- RSPEC-3001: https://rules.sonarsource.com/typescript/RSPEC-3001/
- RSPEC-2999: https://rules.sonarsource.com/typescript/RSPEC-2999/
- RSPEC-2970: https://rules.sonarsource.com/typescript/RSPEC-2970/
- RSPEC-2871: https://rules.sonarsource.com/typescript/RSPEC-2871/
- RSPEC-2757: https://rules.sonarsource.com/typescript/RSPEC-2757/
- RSPEC-2688: https://rules.sonarsource.com/typescript/RSPEC-2688/
- RSPEC-2639: https://rules.sonarsource.com/typescript/RSPEC-2639/
- RSPEC-2427: https://rules.sonarsource.com/typescript/RSPEC-2427/
- RSPEC-2424: https://rules.sonarsource.com/typescript/RSPEC-2424/
- RSPEC-2251: https://rules.sonarsource.com/typescript/RSPEC-2251/
- RSPEC-2234: https://rules.sonarsource.com/typescript/RSPEC-2234/
- RSPEC-2201: https://rules.sonarsource.com/typescript/RSPEC-2201/
- RSPEC-2137: https://rules.sonarsource.com/typescript/RSPEC-2137/
- RSPEC-2123: https://rules.sonarsource.com/typescript/RSPEC-2123/
- RSPEC-2083: https://rules.sonarsource.com/typescript/RSPEC-2083/
- RSPEC-2076: https://rules.sonarsource.com/typescript/RSPEC-2076/
- RSPEC-2004: https://rules.sonarsource.com/typescript/RSPEC-2004/
- RSPEC-1994: https://rules.sonarsource.com/typescript/RSPEC-1994/
- RSPEC-1940: https://rules.sonarsource.com/typescript/RSPEC-1940/
- RSPEC-1862: https://rules.sonarsource.com/typescript/RSPEC-1862/
- RSPEC-1764: https://rules.sonarsource.com/typescript/RSPEC-1764/
- RSPEC-1763: https://rules.sonarsource.com/typescript/RSPEC-1763/
- RSPEC-1751: https://rules.sonarsource.com/typescript/RSPEC-1751/
- RSPEC-1656: https://rules.sonarsource.com/typescript/RSPEC-1656/
- RSPEC-1535: https://rules.sonarsource.com/typescript/RSPEC-1535/
- RSPEC-1534: https://rules.sonarsource.com/typescript/RSPEC-1534/
- RSPEC-1530: https://rules.sonarsource.com/typescript/RSPEC-1530/
- RSPEC-1529: https://rules.sonarsource.com/typescript/RSPEC-1529/

(Para a lista completa e sempre atualizada, use o filtro "Bug".)


### Vulnerabilities (amostra representativa + índice)

Paráfrases úteis:
- RSPEC-5696 — Evite XSS em atualizações de DOM; sanitize/escape corretamente.
- RSPEC-5883 — Proteja comandos OS contra injeção (valide, cite, use APIs seguras).
- RSPEC-5334 — Evite execução dinâmica/injeção de código.
- RSPEC-5527 — Verifique hostnames em conexões TLS.
- RSPEC-4423 — Não use protocolos TLS fracos.
- RSPEC-4426 — Chaves criptográficas devem ser robustas.
- RSPEC-3649 — Evite injeção em queries SQL/ORM.

Índice (links):
- RSPEC-7044: https://rules.sonarsource.com/typescript/RSPEC-7044/
- RSPEC-6105: https://rules.sonarsource.com/typescript/RSPEC-6105/
- RSPEC-6096: https://rules.sonarsource.com/typescript/RSPEC-6096/
- RSPEC-5883: https://rules.sonarsource.com/typescript/RSPEC-5883/
- RSPEC-5876: https://rules.sonarsource.com/typescript/RSPEC-5876/
- RSPEC-5696: https://rules.sonarsource.com/typescript/RSPEC-5696/
- RSPEC-5659: https://rules.sonarsource.com/typescript/RSPEC-5659/
- RSPEC-5527: https://rules.sonarsource.com/typescript/RSPEC-5527/
- RSPEC-5443: https://rules.sonarsource.com/typescript/RSPEC-5443/
- RSPEC-5334: https://rules.sonarsource.com/typescript/RSPEC-5334/
- RSPEC-5332: https://rules.sonarsource.com/typescript/RSPEC-5332/
- RSPEC-5147: https://rules.sonarsource.com/typescript/RSPEC-5147/
- RSPEC-5146: https://rules.sonarsource.com/typescript/RSPEC-5146/
- RSPEC-5144: https://rules.sonarsource.com/typescript/RSPEC-5144/
- RSPEC-5131: https://rules.sonarsource.com/typescript/RSPEC-5131/
- RSPEC-4830: https://rules.sonarsource.com/typescript/RSPEC-4830/
- RSPEC-4426: https://rules.sonarsource.com/typescript/RSPEC-4426/
- RSPEC-4423: https://rules.sonarsource.com/typescript/RSPEC-4423/
- RSPEC-3649: https://rules.sonarsource.com/typescript/RSPEC-3649/
- RSPEC-2819: https://rules.sonarsource.com/typescript/RSPEC-2819/
- RSPEC-2817: https://rules.sonarsource.com/typescript/RSPEC-2817/
- RSPEC-2755: https://rules.sonarsource.com/typescript/RSPEC-2755/
- RSPEC-2631: https://rules.sonarsource.com/typescript/RSPEC-2631/
- RSPEC-2598: https://rules.sonarsource.com/typescript/RSPEC-2598/
- RSPEC-2083: https://rules.sonarsource.com/typescript/RSPEC-2083/
- RSPEC-2076: https://rules.sonarsource.com/typescript/RSPEC-2076/

(Use o filtro "Vulnerability" para a lista completa.)


### Security Hotspots (amostra representativa + índice)

Paráfrases úteis:
- Revisar uso de PRNG, regex complexas, leitura de stdin/args de linha de comando, cookies sem flags, headers de segurança e configurações cloud (AWS S3/RDS/SNS/SQS/EBS/EFS, etc.).

Índice (links):
- RSPEC-6333: https://rules.sonarsource.com/typescript/RSPEC-6333/
- RSPEC-6332: https://rules.sonarsource.com/typescript/RSPEC-6332/
- RSPEC-6330: https://rules.sonarsource.com/typescript/RSPEC-6330/
- RSPEC-6329: https://rules.sonarsource.com/typescript/RSPEC-6329/
- RSPEC-6327: https://rules.sonarsource.com/typescript/RSPEC-6327/
- RSPEC-6326: https://rules.sonarsource.com/typescript/RSPEC-6326/
- RSPEC-6321: https://rules.sonarsource.com/typescript/RSPEC-6321/
- RSPEC-6319: https://rules.sonarsource.com/typescript/RSPEC-6319/
- RSPEC-6308: https://rules.sonarsource.com/typescript/RSPEC-6308/
- RSPEC-6304: https://rules.sonarsource.com/typescript/RSPEC-6304/
- RSPEC-6303: https://rules.sonarsource.com/typescript/RSPEC-6303/
- RSPEC-6302: https://rules.sonarsource.com/typescript/RSPEC-6302/
- RSPEC-6299: https://rules.sonarsource.com/typescript/RSPEC-6299/
- RSPEC-6287: https://rules.sonarsource.com/typescript/RSPEC-6287/
- RSPEC-6281: https://rules.sonarsource.com/typescript/RSPEC-6281/
- RSPEC-6275: https://rules.sonarsource.com/typescript/RSPEC-6275/
- RSPEC-6270: https://rules.sonarsource.com/typescript/RSPEC-6270/
- RSPEC-6268: https://rules.sonarsource.com/typescript/RSPEC-6268/
- RSPEC-6265: https://rules.sonarsource.com/typescript/RSPEC-6265/
- RSPEC-6252: https://rules.sonarsource.com/typescript/RSPEC-6252/
- RSPEC-6249: https://rules.sonarsource.com/typescript/RSPEC-6249/
- RSPEC-6245: https://rules.sonarsource.com/typescript/RSPEC-6245/
- RSPEC-5759: https://rules.sonarsource.com/typescript/RSPEC-5759/
- RSPEC-5757: https://rules.sonarsource.com/typescript/RSPEC-5757/
- RSPEC-5743: https://rules.sonarsource.com/typescript/RSPEC-5743/
- RSPEC-5742: https://rules.sonarsource.com/typescript/RSPEC-5742/
- RSPEC-5739: https://rules.sonarsource.com/typescript/RSPEC-5739/
- RSPEC-5736: https://rules.sonarsource.com/typescript/RSPEC-5736/
- RSPEC-5734: https://rules.sonarsource.com/typescript/RSPEC-5734/
- RSPEC-5732: https://rules.sonarsource.com/typescript/RSPEC-5732/
- RSPEC-5730: https://rules.sonarsource.com/typescript/RSPEC-5730/
- RSPEC-5728: https://rules.sonarsource.com/typescript/RSPEC-5728/
- RSPEC-5725: https://rules.sonarsource.com/typescript/RSPEC-5725/
- RSPEC-5604: https://rules.sonarsource.com/typescript/RSPEC-5604/
- RSPEC-5443: https://rules.sonarsource.com/typescript/RSPEC-5443/
- RSPEC-5332: https://rules.sonarsource.com/typescript/RSPEC-5332/
- RSPEC-5247: https://rules.sonarsource.com/typescript/RSPEC-5247/
- RSPEC-5148: https://rules.sonarsource.com/typescript/RSPEC-5148/
- RSPEC-5122: https://rules.sonarsource.com/typescript/RSPEC-5122/
- RSPEC-5042: https://rules.sonarsource.com/typescript/RSPEC-5042/
- RSPEC-4829: https://rules.sonarsource.com/typescript/RSPEC-4829/
- RSPEC-4823: https://rules.sonarsource.com/typescript/RSPEC-4823/
- RSPEC-4818: https://rules.sonarsource.com/typescript/RSPEC-4818/
- RSPEC-4817: https://rules.sonarsource.com/typescript/RSPEC-4817/
- RSPEC-4790: https://rules.sonarsource.com/typescript/RSPEC-4790/
- RSPEC-4787: https://rules.sonarsource.com/typescript/RSPEC-4787/
- RSPEC-4784: https://rules.sonarsource.com/typescript/RSPEC-4784/
- RSPEC-4721: https://rules.sonarsource.com/typescript/RSPEC-4721/
- RSPEC-4507: https://rules.sonarsource.com/typescript/RSPEC-4507/
- RSPEC-4502: https://rules.sonarsource.com/typescript/RSPEC-4502/
- RSPEC-3330: https://rules.sonarsource.com/typescript/RSPEC-3330/
- RSPEC-2255: https://rules.sonarsource.com/typescript/RSPEC-2255/
- RSPEC-2245: https://rules.sonarsource.com/typescript/RSPEC-2245/
- RSPEC-2077: https://rules.sonarsource.com/typescript/RSPEC-2077/
- RSPEC-2068: https://rules.sonarsource.com/typescript/RSPEC-2068/
- RSPEC-1313: https://rules.sonarsource.com/typescript/RSPEC-1313/
- RSPEC-106: https://rules.sonarsource.com/typescript/RSPEC-106/

(Use o filtro "Security Hotspot" para mais.)


### Code Smells (amostra representativa + índice parcial)

Paráfrases úteis:
- Use `const` quando imutável, agrupe imports, remova código morto, reduza complexidade, use APIs modernas (`?.`, `??`, spreads), prefira `as const`, evite ternários aninhados e magic numbers.
- Em React/JSX: chaves estáveis, não usar `index` como key, evitar `bind`/arrow em props, fragmentos redundantes e props desconhecidas.
- Em TypeScript: evite `any`, `void`, `module`; agrupe overloads; prefira predicates/aliases; evite constraints redundantes; valores únicos em enums; evite membros mapeados inconsistentes.

Índice parcial (links):
- RSPEC-7060: https://rules.sonarsource.com/typescript/RSPEC-7060/
- RSPEC-7059: https://rules.sonarsource.com/typescript/RSPEC-7059/
- RSPEC-6861: https://rules.sonarsource.com/typescript/RSPEC-6861/
- RSPEC-6859: https://rules.sonarsource.com/typescript/RSPEC-6859/
- RSPEC-6853: https://rules.sonarsource.com/typescript/RSPEC-6853/
- RSPEC-6852: https://rules.sonarsource.com/typescript/RSPEC-6852/
- RSPEC-6851: https://rules.sonarsource.com/typescript/RSPEC-6851/
- RSPEC-6850: https://rules.sonarsource.com/typescript/RSPEC-6850/
- RSPEC-6848: https://rules.sonarsource.com/typescript/RSPEC-6848/
- RSPEC-6847: https://rules.sonarsource.com/typescript/RSPEC-6847/
- RSPEC-6846: https://rules.sonarsource.com/typescript/RSPEC-6846/
- RSPEC-6845: https://rules.sonarsource.com/typescript/RSPEC-6845/
- RSPEC-6844: https://rules.sonarsource.com/typescript/RSPEC-6844/
- RSPEC-6843: https://rules.sonarsource.com/typescript/RSPEC-6843/
- RSPEC-6842: https://rules.sonarsource.com/typescript/RSPEC-6842/
- RSPEC-6841: https://rules.sonarsource.com/typescript/RSPEC-6841/
- RSPEC-6840: https://rules.sonarsource.com/typescript/RSPEC-6840/
- RSPEC-6836: https://rules.sonarsource.com/typescript/RSPEC-6836/
- RSPEC-6827: https://rules.sonarsource.com/typescript/RSPEC-6827/
- RSPEC-6825: https://rules.sonarsource.com/typescript/RSPEC-6825/
- RSPEC-6824: https://rules.sonarsource.com/typescript/RSPEC-6824/
- RSPEC-6823: https://rules.sonarsource.com/typescript/RSPEC-6823/
- RSPEC-6822: https://rules.sonarsource.com/typescript/RSPEC-6822/
- RSPEC-6821: https://rules.sonarsource.com/typescript/RSPEC-6821/
- RSPEC-6819: https://rules.sonarsource.com/typescript/RSPEC-6819/
- RSPEC-6811: https://rules.sonarsource.com/typescript/RSPEC-6811/
- RSPEC-6807: https://rules.sonarsource.com/typescript/RSPEC-6807/
- RSPEC-6793: https://rules.sonarsource.com/typescript/RSPEC-6793/
- RSPEC-6791: https://rules.sonarsource.com/typescript/RSPEC-6791/
- RSPEC-6790: https://rules.sonarsource.com/typescript/RSPEC-6790/
- RSPEC-6789: https://rules.sonarsource.com/typescript/RSPEC-6789/
- RSPEC-6788: https://rules.sonarsource.com/typescript/RSPEC-6788/
- RSPEC-6775: https://rules.sonarsource.com/typescript/RSPEC-6775/
- RSPEC-6772: https://rules.sonarsource.com/typescript/RSPEC-6772/
- RSPEC-6770: https://rules.sonarsource.com/typescript/RSPEC-6770/
- RSPEC-6767: https://rules.sonarsource.com/typescript/RSPEC-6767/
- RSPEC-6766: https://rules.sonarsource.com/typescript/RSPEC-6766/
- RSPEC-6763: https://rules.sonarsource.com/typescript/RSPEC-6763/
- RSPEC-6761: https://rules.sonarsource.com/typescript/RSPEC-6761/
- RSPEC-6759: https://rules.sonarsource.com/typescript/RSPEC-6759/
- RSPEC-6757: https://rules.sonarsource.com/typescript/RSPEC-6757/
- RSPEC-6756: https://rules.sonarsource.com/typescript/RSPEC-6756/
- RSPEC-6754: https://rules.sonarsource.com/typescript/RSPEC-6754/
- RSPEC-6750: https://rules.sonarsource.com/typescript/RSPEC-6750/
- RSPEC-6749: https://rules.sonarsource.com/typescript/RSPEC-6749/
- RSPEC-6748: https://rules.sonarsource.com/typescript/RSPEC-6748/
- RSPEC-6747: https://rules.sonarsource.com/typescript/RSPEC-6747/
- RSPEC-6746: https://rules.sonarsource.com/typescript/RSPEC-6746/
- RSPEC-6676: https://rules.sonarsource.com/typescript/RSPEC-6676/
- RSPEC-6671: https://rules.sonarsource.com/typescript/RSPEC-6671/
- RSPEC-6666: https://rules.sonarsource.com/typescript/RSPEC-6666/
- RSPEC-6661: https://rules.sonarsource.com/typescript/RSPEC-6661/
- RSPEC-6660: https://rules.sonarsource.com/typescript/RSPEC-6660/
- RSPEC-6657: https://rules.sonarsource.com/typescript/RSPEC-6657/
- RSPEC-6654: https://rules.sonarsource.com/typescript/RSPEC-6654/
- RSPEC-6653: https://rules.sonarsource.com/typescript/RSPEC-6653/
- RSPEC-6650: https://rules.sonarsource.com/typescript/RSPEC-6650/
- RSPEC-6647: https://rules.sonarsource.com/typescript/RSPEC-6647/
- RSPEC-6644: https://rules.sonarsource.com/typescript/RSPEC-6644/
- RSPEC-6643: https://rules.sonarsource.com/typescript/RSPEC-6643/
- RSPEC-6637: https://rules.sonarsource.com/typescript/RSPEC-6637/
- RSPEC-6635: https://rules.sonarsource.com/typescript/RSPEC-6635/
- RSPEC-6627: https://rules.sonarsource.com/typescript/RSPEC-6627/
- RSPEC-6606: https://rules.sonarsource.com/typescript/RSPEC-6606/
- RSPEC-6598: https://rules.sonarsource.com/typescript/RSPEC-6598/
- RSPEC-6594: https://rules.sonarsource.com/typescript/RSPEC-6594/
- RSPEC-6590: https://rules.sonarsource.com/typescript/RSPEC-6590/
- RSPEC-6583: https://rules.sonarsource.com/typescript/RSPEC-6583/
- RSPEC-6582: https://rules.sonarsource.com/typescript/RSPEC-6582/
- RSPEC-6578: https://rules.sonarsource.com/typescript/RSPEC-6578/
- RSPEC-6572: https://rules.sonarsource.com/typescript/RSPEC-6572/
- RSPEC-6571: https://rules.sonarsource.com/typescript/RSPEC-6571/
- RSPEC-6569: https://rules.sonarsource.com/typescript/RSPEC-6569/
- RSPEC-6568: https://rules.sonarsource.com/typescript/RSPEC-6568/
- RSPEC-6565: https://rules.sonarsource.com/typescript/RSPEC-6565/
- RSPEC-6564: https://rules.sonarsource.com/typescript/RSPEC-6564/
- RSPEC-6557: https://rules.sonarsource.com/typescript/RSPEC-6557/
- RSPEC-6551: https://rules.sonarsource.com/typescript/RSPEC-6551/
- RSPEC-6550: https://rules.sonarsource.com/typescript/RSPEC-6550/
- RSPEC-6544: https://rules.sonarsource.com/typescript/RSPEC-6544/
- RSPEC-6535: https://rules.sonarsource.com/typescript/RSPEC-6535/
- RSPEC-6522: https://rules.sonarsource.com/typescript/RSPEC-6522/
- RSPEC-6509: https://rules.sonarsource.com/typescript/RSPEC-6509/
- RSPEC-6486: https://rules.sonarsource.com/typescript/RSPEC-6486/
- RSPEC-6481: https://rules.sonarsource.com/typescript/RSPEC-6481/
- RSPEC-6480: https://rules.sonarsource.com/typescript/RSPEC-6480/
- RSPEC-6479: https://rules.sonarsource.com/typescript/RSPEC-6479/
- RSPEC-6478: https://rules.sonarsource.com/typescript/RSPEC-6478/
- RSPEC-6477: https://rules.sonarsource.com/typescript/RSPEC-6477/
- RSPEC-4328: https://rules.sonarsource.com/typescript/RSPEC-4328/
- RSPEC-4327: https://rules.sonarsource.com/typescript/RSPEC-4327/
- RSPEC-4326: https://rules.sonarsource.com/typescript/RSPEC-4326/
- RSPEC-4325: https://rules.sonarsource.com/typescript/RSPEC-4325/
- RSPEC-4324: https://rules.sonarsource.com/typescript/RSPEC-4324/
- RSPEC-4323: https://rules.sonarsource.com/typescript/RSPEC-4323/
- RSPEC-4322: https://rules.sonarsource.com/typescript/RSPEC-4322/
- RSPEC-4204: https://rules.sonarsource.com/typescript/RSPEC-4204/
- RSPEC-4165: https://rules.sonarsource.com/typescript/RSPEC-4165/
- RSPEC-4157: https://rules.sonarsource.com/typescript/RSPEC-4157/
- RSPEC-4156: https://rules.sonarsource.com/typescript/RSPEC-4156/
- RSPEC-4144: https://rules.sonarsource.com/typescript/RSPEC-4144/
- RSPEC-4143: https://rules.sonarsource.com/typescript/RSPEC-4143/
- RSPEC-4140: https://rules.sonarsource.com/typescript/RSPEC-4140/
- RSPEC-4139: https://rules.sonarsource.com/typescript/RSPEC-4139/
- RSPEC-4138: https://rules.sonarsource.com/typescript/RSPEC-4138/
- RSPEC-4137: https://rules.sonarsource.com/typescript/RSPEC-4137/
- RSPEC-4136: https://rules.sonarsource.com/typescript/RSPEC-4136/
- RSPEC-4123: https://rules.sonarsource.com/typescript/RSPEC-4123/
- RSPEC-4084: https://rules.sonarsource.com/typescript/RSPEC-4084/
- RSPEC-4043: https://rules.sonarsource.com/typescript/RSPEC-4043/
- RSPEC-4036: https://rules.sonarsource.com/typescript/RSPEC-4036/
- RSPEC-4030: https://rules.sonarsource.com/typescript/RSPEC-4030/
- RSPEC-4023: https://rules.sonarsource.com/typescript/RSPEC-4023/
- RSPEC-3973: https://rules.sonarsource.com/typescript/RSPEC-3973/
- RSPEC-3972: https://rules.sonarsource.com/typescript/RSPEC-3972/
- RSPEC-3863: https://rules.sonarsource.com/typescript/RSPEC-3863/
- RSPEC-3801: https://rules.sonarsource.com/typescript/RSPEC-3801/
- RSPEC-3776: https://rules.sonarsource.com/typescript/RSPEC-3776/
- RSPEC-3735: https://rules.sonarsource.com/typescript/RSPEC-3735/
- RSPEC-3723: https://rules.sonarsource.com/typescript/RSPEC-3723/
- RSPEC-3696: https://rules.sonarsource.com/typescript/RSPEC-3696/
- RSPEC-3626: https://rules.sonarsource.com/typescript/RSPEC-3626/
- RSPEC-3616: https://rules.sonarsource.com/typescript/RSPEC-3616/
- RSPEC-3579: https://rules.sonarsource.com/typescript/RSPEC-3579/
- RSPEC-3533: https://rules.sonarsource.com/typescript/RSPEC-3533/
- RSPEC-3525: https://rules.sonarsource.com/typescript/RSPEC-3525/
- RSPEC-3524: https://rules.sonarsource.com/typescript/RSPEC-3524/
- RSPEC-3516: https://rules.sonarsource.com/typescript/RSPEC-3516/
- RSPEC-3514: https://rules.sonarsource.com/typescript/RSPEC-3514/
- RSPEC-3513: https://rules.sonarsource.com/typescript/RSPEC-3513/
- RSPEC-3512: https://rules.sonarsource.com/typescript/RSPEC-3512/
- RSPEC-3504: https://rules.sonarsource.com/typescript/RSPEC-3504/
- RSPEC-3499: https://rules.sonarsource.com/typescript/RSPEC-3499/
- RSPEC-3498: https://rules.sonarsource.com/typescript/RSPEC-3498/
- RSPEC-3415: https://rules.sonarsource.com/typescript/RSPEC-3415/
- RSPEC-3402: https://rules.sonarsource.com/typescript/RSPEC-3402/
- RSPEC-3358: https://rules.sonarsource.com/typescript/RSPEC-3358/
- RSPEC-3353: https://rules.sonarsource.com/typescript/RSPEC-3353/
- RSPEC-3317: https://rules.sonarsource.com/typescript/RSPEC-3317/
- RSPEC-3257: https://rules.sonarsource.com/typescript/RSPEC-3257/
- RSPEC-3003: https://rules.sonarsource.com/typescript/RSPEC-3003/
- RSPEC-2990: https://rules.sonarsource.com/typescript/RSPEC-2990/
- RSPEC-2966: https://rules.sonarsource.com/typescript/RSPEC-2966/
- RSPEC-2933: https://rules.sonarsource.com/typescript/RSPEC-2933/
- RSPEC-2870: https://rules.sonarsource.com/typescript/RSPEC-2870/
- RSPEC-2737: https://rules.sonarsource.com/typescript/RSPEC-2737/
- RSPEC-2699: https://rules.sonarsource.com/typescript/RSPEC-2699/
- RSPEC-2692: https://rules.sonarsource.com/typescript/RSPEC-2692/
- RSPEC-2685: https://rules.sonarsource.com/typescript/RSPEC-2685/
- RSPEC-2681: https://rules.sonarsource.com/typescript/RSPEC-2681/
- RSPEC-2612: https://rules.sonarsource.com/typescript/RSPEC-2612/
- RSPEC-2589: https://rules.sonarsource.com/typescript/RSPEC-2589/
- RSPEC-2486: https://rules.sonarsource.com/typescript/RSPEC-2486/
- RSPEC-2430: https://rules.sonarsource.com/typescript/RSPEC-2430/
- RSPEC-2392: https://rules.sonarsource.com/typescript/RSPEC-2392/
- RSPEC-2376: https://rules.sonarsource.com/typescript/RSPEC-2376/
- RSPEC-2310: https://rules.sonarsource.com/typescript/RSPEC-2310/
- RSPEC-2301: https://rules.sonarsource.com/typescript/RSPEC-2301/
- RSPEC-2260: https://rules.sonarsource.com/typescript/RSPEC-2260/
- RSPEC-2234: https://rules.sonarsource.com/typescript/RSPEC-2234/
- RSPEC-2208: https://rules.sonarsource.com/typescript/RSPEC-2208/
- RSPEC-2187: https://rules.sonarsource.com/typescript/RSPEC-2187/
- RSPEC-2138: https://rules.sonarsource.com/typescript/RSPEC-2138/
- RSPEC-2094: https://rules.sonarsource.com/typescript/RSPEC-2094/
- RSPEC-2004: https://rules.sonarsource.com/typescript/RSPEC-2004/
- RSPEC-1994: https://rules.sonarsource.com/typescript/RSPEC-1994/
- RSPEC-1940: https://rules.sonarsource.com/typescript/RSPEC-1940/
- RSPEC-1874: https://rules.sonarsource.com/typescript/RSPEC-1874/
- RSPEC-1871: https://rules.sonarsource.com/typescript/RSPEC-1871/
- RSPEC-1821: https://rules.sonarsource.com/typescript/RSPEC-1821/
- RSPEC-1788: https://rules.sonarsource.com/typescript/RSPEC-1788/
- RSPEC-1774: https://rules.sonarsource.com/typescript/RSPEC-1774/
- RSPEC-1607: https://rules.sonarsource.com/typescript/RSPEC-1607/
- RSPEC-1541: https://rules.sonarsource.com/typescript/RSPEC-1541/
- RSPEC-1539: https://rules.sonarsource.com/typescript/RSPEC-1539/
- RSPEC-1537: https://rules.sonarsource.com/typescript/RSPEC-1537/
- RSPEC-1528: https://rules.sonarsource.com/typescript/RSPEC-1528/
- RSPEC-1526: https://rules.sonarsource.com/typescript/RSPEC-1526/
- RSPEC-1525: https://rules.sonarsource.com/typescript/RSPEC-1525/
- RSPEC-1523: https://rules.sonarsource.com/typescript/RSPEC-1523/
- RSPEC-1516: https://rules.sonarsource.com/typescript/RSPEC-1516/
- RSPEC-1515: https://rules.sonarsource.com/typescript/RSPEC-1515/
- RSPEC-1488: https://rules.sonarsource.com/typescript/RSPEC-1488/
- RSPEC-1479: https://rules.sonarsource.com/typescript/RSPEC-1479/
- RSPEC-1472: https://rules.sonarsource.com/typescript/RSPEC-1472/
- RSPEC-1451: https://rules.sonarsource.com/typescript/RSPEC-1451/
- RSPEC-1444: https://rules.sonarsource.com/typescript/RSPEC-1444/
- RSPEC-1441: https://rules.sonarsource.com/typescript/RSPEC-1441/
- RSPEC-1440: https://rules.sonarsource.com/typescript/RSPEC-1440/
- RSPEC-1439: https://rules.sonarsource.com/typescript/RSPEC-1439/
- RSPEC-1438: https://rules.sonarsource.com/typescript/RSPEC-1438/
- RSPEC-139: https://rules.sonarsource.com/typescript/RSPEC-139/
- RSPEC-138: https://rules.sonarsource.com/typescript/RSPEC-138/
- RSPEC-135: https://rules.sonarsource.com/typescript/RSPEC-135/
- RSPEC-134: https://rules.sonarsource.com/typescript/RSPEC-134/
- RSPEC-1314: https://rules.sonarsource.com/typescript/RSPEC-1314/
- RSPEC-131: https://rules.sonarsource.com/typescript/RSPEC-131/
- RSPEC-1301: https://rules.sonarsource.com/typescript/RSPEC-1301/
- RSPEC-128: https://rules.sonarsource.com/typescript/RSPEC-128/
- RSPEC-1264: https://rules.sonarsource.com/typescript/RSPEC-1264/
- RSPEC-126: https://rules.sonarsource.com/typescript/RSPEC-126/
- RSPEC-125: https://rules.sonarsource.com/typescript/RSPEC-125/
- RSPEC-124: https://rules.sonarsource.com/typescript/RSPEC-124/
- RSPEC-1226: https://rules.sonarsource.com/typescript/RSPEC-1226/
- RSPEC-122: https://rules.sonarsource.com/typescript/RSPEC-122/
- RSPEC-1219: https://rules.sonarsource.com/typescript/RSPEC-1219/
- RSPEC-121: https://rules.sonarsource.com/typescript/RSPEC-121/
- RSPEC-1199: https://rules.sonarsource.com/typescript/RSPEC-1199/
- RSPEC-1192: https://rules.sonarsource.com/typescript/RSPEC-1192/
- RSPEC-1186: https://rules.sonarsource.com/typescript/RSPEC-1186/
- RSPEC-1172: https://rules.sonarsource.com/typescript/RSPEC-1172/
- RSPEC-117: https://rules.sonarsource.com/typescript/RSPEC-117/
- RSPEC-1154: https://rules.sonarsource.com/typescript/RSPEC-1154/
- RSPEC-1143: https://rules.sonarsource.com/typescript/RSPEC-1143/
- RSPEC-1135: https://rules.sonarsource.com/typescript/RSPEC-1135/
- RSPEC-1134: https://rules.sonarsource.com/typescript/RSPEC-1134/
- RSPEC-1131: https://rules.sonarsource.com/typescript/RSPEC-1131/
- RSPEC-113: https://rules.sonarsource.com/typescript/RSPEC-113/
- RSPEC-1128: https://rules.sonarsource.com/typescript/RSPEC-1128/
- RSPEC-1125: https://rules.sonarsource.com/typescript/RSPEC-1125/
- RSPEC-1121: https://rules.sonarsource.com/typescript/RSPEC-1121/
- RSPEC-1119: https://rules.sonarsource.com/typescript/RSPEC-1119/
- RSPEC-1117: https://rules.sonarsource.com/typescript/RSPEC-1117/
- RSPEC-1116: https://rules.sonarsource.com/typescript/RSPEC-1116/
- RSPEC-1110: https://rules.sonarsource.com/typescript/RSPEC-1110/
- RSPEC-1105: https://rules.sonarsource.com/typescript/RSPEC-1105/
- RSPEC-1090: https://rules.sonarsource.com/typescript/RSPEC-1090/
- RSPEC-109: https://rules.sonarsource.com/typescript/RSPEC-109/
- RSPEC-1082: https://rules.sonarsource.com/typescript/RSPEC-1082/
- RSPEC-108: https://rules.sonarsource.com/typescript/RSPEC-108/
- RSPEC-1077: https://rules.sonarsource.com/typescript/RSPEC-1077/
- RSPEC-107: https://rules.sonarsource.com/typescript/RSPEC-107/
- RSPEC-1068: https://rules.sonarsource.com/typescript/RSPEC-1068/
- RSPEC-1067: https://rules.sonarsource.com/typescript/RSPEC-1067/
- RSPEC-1066: https://rules.sonarsource.com/typescript/RSPEC-1066/
- RSPEC-106: https://rules.sonarsource.com/typescript/RSPEC-106/
- RSPEC-105: https://rules.sonarsource.com/typescript/RSPEC-105/
- RSPEC-104: https://rules.sonarsource.com/typescript/RSPEC-104/
- RSPEC-103: https://rules.sonarsource.com/typescript/RSPEC-103/
- RSPEC-101: https://rules.sonarsource.com/typescript/RSPEC-101/
- RSPEC-100: https://rules.sonarsource.com/typescript/RSPEC-100/

(Use o filtro "Code Smell" para a lista completa e atual.)


## Dicas de correção (para Copilot) por padrão recorrente

- Trocar igualdade frouxa por estrita: `==`/`!=` → `===`/`!==`.
- Reduzir complexidade: extrair funções, early‑return, decompôr condicionais.
- Segurança de string/DOM: sanitize/escape, usar APIs seguras, evitar `innerHTML` com input não confiável.
- Promises/async: sempre `await` promises; não misturar `then` com `await`; tratar erros com `try/catch`.
- Regex: adicionar flags corretas, evitar grupos vazios/duplicados, simplificar classes/quantificadores.
- React/JSX: chaves estáveis; não usar `index` como key; evitar `bind`/arrow no JSX; não mutar state.
- TypeScript: remover `any`/non‑null desnecessários; preferir types/aliases; usar optional chaining e nullish coalescing.


## Integração com ESLint (complementar)

- Muitas regras Sonar têm equivalentes em ESLint/TypeScript‑ESLint (ex.: `no-var`, `no-eval`, `eqeqeq`, `no-shadow`, `no-unsafe-optional-chaining`).
- Use `@typescript-eslint` e plugins específicos (ex.: `eslint-plugin-react`, `eslint-plugin-jsx-a11y`) para capturar problemas de estilo/legibilidade e acessibilidade.
- Sonar continua sendo a fonte de verdade para cobertura de vulnerabilidades e hotspots.


## Referências e atualizações

- Página principal de TypeScript (regras e filtros): https://rules.sonarsource.com/typescript/
- Consulte sempre o site para contagem, severidades e textos atualizados.
- Este guia é um índice/auxílio ao Copilot; não substitui a documentação oficial.


---

Se quiser, posso transformar este índice em um conjunto de instruções do GitHub Copilot (Copilot Instructions) com exemplos de prompts específicos do seu projeto Angular (serviços, componentes, interceptors, RxJS).