<?xml version="1.0" encoding="UTF-8"?>
<!--
  Makes /sitemap.xml readable in a browser. Search engines ignore this file and read the XML.
  The language of each URL comes from its own hreflang entry (pages without translations are English).
-->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="s xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes" doctype-system="about:legacy-compat"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex, follow"/>
        <title>Sitemap — Marketixo</title>
        <style>
          :root { color-scheme: dark; }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            background: #001219;
            color: #e6efed;
            font: 15px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
          }
          main { max-width: 1100px; margin: 0 auto; padding: 48px 16px 64px; }
          .eyebrow { margin: 0 0 8px; color: #94d2bd; font: 600 12px/1 ui-monospace, Consolas, monospace; letter-spacing: .14em; text-transform: uppercase; }
          h1 { margin: 0 0 12px; font-size: clamp(28px, 4vw, 40px); letter-spacing: -.02em; }
          .intro { margin: 0 0 32px; color: #9fb3b1; max-width: 60ch; }
          .intro strong { color: #e6efed; }
          .table { overflow-x: auto; border: 1px solid rgba(148, 210, 189, .16); border-radius: 12px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 12px 16px; text-align: left; vertical-align: top; }
          th { color: #9fb3b1; font: 600 11px/1 ui-monospace, Consolas, monospace; letter-spacing: .12em; text-transform: uppercase; background: rgba(148, 210, 189, .05); }
          tr + tr td { border-top: 1px solid rgba(148, 210, 189, .1); }
          tbody tr:hover td { background: rgba(148, 210, 189, .04); }
          td.n { color: #5f7a78; font-family: ui-monospace, Consolas, monospace; width: 3.5em; }
          a { color: #e6efed; text-decoration: none; word-break: break-all; }
          a:hover { color: #94d2bd; text-decoration: underline; }
          .lang { display: inline-block; min-width: 2.6em; padding: 3px 7px; border-radius: 6px; text-align: center; font: 600 11px/1.2 ui-monospace, Consolas, monospace; background: rgba(10, 147, 150, .22); color: #94d2bd; }
          .alts a { margin-right: 10px; color: #9fb3b1; font: 12px/1.6 ui-monospace, Consolas, monospace; }
          .alts a:hover { color: #ee9b00; }
          td.date { white-space: nowrap; color: #9fb3b1; font-family: ui-monospace, Consolas, monospace; }
        </style>
      </head>
      <body>
        <main>
          <p class="eyebrow">Marketixo · XML sitemap</p>
          <h1>Sitemap</h1>
          <p class="intro">
            <strong><xsl:value-of select="count(s:urlset/s:url)"/> pages</strong> in English, German, Italian and Albanian.
            This file tells search engines like Google which pages exist and how they are translated.
          </p>
          <div class="table">
            <table>
              <thead>
                <tr><th>#</th><th>Lang</th><th>URL</th><th>Translations</th><th>Updated</th></tr>
              </thead>
              <tbody>
                <xsl:for-each select="s:urlset/s:url">
                  <xsl:variable name="loc" select="s:loc"/>
                  <xsl:variable name="self" select="xhtml:link[@href = $loc and @hreflang != 'x-default']/@hreflang"/>
                  <tr>
                    <td class="n"><xsl:value-of select="position()"/></td>
                    <td>
                      <span class="lang">
                        <xsl:choose>
                          <xsl:when test="$self"><xsl:value-of select="translate($self, 'abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')"/></xsl:when>
                          <xsl:otherwise>EN</xsl:otherwise>
                        </xsl:choose>
                      </span>
                    </td>
                    <td><a href="{$loc}"><xsl:value-of select="$loc"/></a></td>
                    <td class="alts">
                      <xsl:for-each select="xhtml:link[@href != $loc and @hreflang != 'x-default']">
                        <a href="{@href}" hreflang="{@hreflang}"><xsl:value-of select="translate(@hreflang, 'abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')"/></a>
                      </xsl:for-each>
                    </td>
                    <td class="date"><xsl:value-of select="s:lastmod"/></td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
