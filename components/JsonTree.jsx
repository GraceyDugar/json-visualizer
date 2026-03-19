'use client'
import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

function buildTree(data, name = 'root') {
  if (Array.isArray(data)) {
    return {
      name,
      type: 'array',
      children: data.map((item, i) => buildTree(item, `[${i}]`))
    }
  } else if (typeof data === 'object' && data !== null) {
    return {
      name,
      type: 'object',
      children: Object.entries(data).map(([k, v]) => buildTree(v, k))
    }
  } else {
    return { name, type: typeof data, value: String(data) }
  }
}

const TYPE_COLORS = {
  object: '#7c3aed',
  array: '#0891b2',
  string: '#059669',
  number: '#d97706',
  boolean: '#e11d48',
  root: '#1e293b'
}

const TYPE_BG = {
  object: '#ede9fe',
  array: '#cffafe',
  string: '#d1fae5',
  number: '#fef3c7',
  boolean: '#ffe4e6',
  root: '#f1f5f9'
}

export default function JsonTree({ data }) {
  const svgRef = useRef()

  useEffect(() => {
    if (!data || !svgRef.current) return

    const container = svgRef.current.parentElement
    const width = container.clientWidth || 700
    const height = container.clientHeight || 500

    d3.select(svgRef.current).selectAll('*').remove()

    const treeData = buildTree(data)
    const root = d3.hierarchy(treeData)
    const treeLayout = d3.tree()
      .size([height - 100, width - 250])
      .separation((a, b) => (a.parent === b.parent ? 1.8 : 2.2))
    treeLayout(root)

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', '#fafafa')
      .style('border-radius', '16px')

    // Grid background dots — like Linear/Notion
    const defs = svg.append('defs')
    const pattern = defs.append('pattern')
      .attr('id', 'dots')
      .attr('x', 0).attr('y', 0)
      .attr('width', 24).attr('height', 24)
      .attr('patternUnits', 'userSpaceOnUse')
    pattern.append('circle')
      .attr('cx', 2).attr('cy', 2).attr('r', 1.2)
      .attr('fill', '#cbd5e1')

    svg.append('rect')
      .attr('width', width).attr('height', height)
      .attr('fill', 'url(#dots)')
      .attr('rx', 16)

    const g = svg.append('g').attr('transform', 'translate(120, 50)')

    // Zoom + pan
    svg.call(
      d3.zoom()
        .scaleExtent([0.2, 4])
        .on('zoom', (event) => g.attr('transform', event.transform))
    )

    // Smooth curved links
    g.selectAll('.link')
      .data(root.links())
      .join('path')
      .attr('fill', 'none')
      .attr('stroke', '#e2e8f0')
      .attr('stroke-width', 2)
      .attr('d', d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x))

    // Node groups
    const node = g.selectAll('.node')
      .data(root.descendants())
      .join('g')
      .attr('transform', d => `translate(${d.y},${d.x})`)
      .style('cursor', 'pointer')

    // Card shadow
    node.append('rect')
      .attr('x', -38)
      .attr('y', -18)
      .attr('width', 76)
      .attr('height', 36)
      .attr('rx', 10)
      .attr('fill', '#00000010')
      .attr('transform', 'translate(2, 3)')

    // Card background
    node.append('rect')
      .attr('x', -38)
      .attr('y', -18)
      .attr('width', 76)
      .attr('height', 36)
      .attr('rx', 10)
      .attr('fill', d => TYPE_BG[d.data.type] || '#f8fafc')
      .attr('stroke', d => TYPE_COLORS[d.data.type] || '#e2e8f0')
      .attr('stroke-width', 1.5)

    // Color dot inside card
    node.append('circle')
      .attr('cx', -24)
      .attr('cy', 0)
      .attr('r', 5)
      .attr('fill', d => TYPE_COLORS[d.data.type] || '#94a3b8')

    // Key name inside card
    node.append('text')
      .attr('x', -14)
      .attr('y', -4)
      .attr('fill', '#1e293b')
      .attr('font-size', '10px')
      .attr('font-weight', '700')
      .attr('font-family', 'Inter, sans-serif')
      .text(d => d.data.name.length > 8
        ? d.data.name.slice(0, 8) + '…'
        : d.data.name)

    // Value inside card
    node.append('text')
      .attr('x', -14)
      .attr('y', 9)
      .attr('fill', d => TYPE_COLORS[d.data.type] || '#64748b')
      .attr('font-size', '9px')
      .attr('font-family', 'monospace')
      .text(d => {
        if (!d.data.value) return d.data.type
        return d.data.value.length > 8
          ? d.data.value.slice(0, 8) + '…'
          : d.data.value
      })

    // Hover effect
    node
      .on('mouseover', function () {
        d3.select(this).selectAll('rect')
          .transition().duration(150)
          .attr('transform', 'translate(-1, -2) scale(1.05)')
      })
      .on('mouseout', function () {
        d3.select(this).selectAll('rect')
          .transition().duration(150)
          .attr('transform', 'translate(0, 0) scale(1)')
      })

  }, [data])

  return <svg ref={svgRef} className="w-full h-full rounded-2xl" />
}